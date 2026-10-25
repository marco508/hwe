import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BookingStatus, Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { PrismaService } from "../prisma/prisma.service";
import { StaysService } from "./stays.service";
import { StaysSchedulerService } from "./stays-scheduler.service";
import { buildIcal } from "./ical";
import { BLOCKING_STATUSES } from "./stays-rules";
import { today as todayDay } from "../common/dates";
import {
  BlockInput,
  BookingRequestInput,
  CancelInput,
  CommissionInput,
  DeclarePaymentInput,
  HiddenInput,
  HostCancelInput,
  HostNoteInput,
  ReplyInput,
  ReviewInput,
  StaySettingsInput,
} from "./stays.dto";

const statusPipe = new ParseEnumPipe(BookingStatus, {
  optional: true,
  exceptionFactory: () => new BadRequestException("Statut de réservation invalide."),
});

const int = (v?: string) => (v && /^\d{1,4}$/.test(v) ? Number(v) : undefined);
const clip = (v?: string) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 100) : undefined);

/** Séjours courte durée : recherche, réservations, calendrier de l'hôte, avis. */
@Controller("stays")
export class StaysController {
  constructor(
    private readonly stays: StaysService,
    private readonly scheduler: StaysSchedulerService,
    private readonly prisma: PrismaService,
  ) {}

  // ── Public ──
  @Get("search")
  search(@Query() q: Record<string, string>) {
    return this.stays.search({
      country: clip(q.country),
      city: clip(q.city),
      destination: clip(q.destination),
      checkIn: clip(q.checkIn),
      checkOut: clip(q.checkOut),
      guests: int(q.guests),
      page: int(q.page),
    });
  }

  @Get("property/:id")
  publicInfo(@Param("id") id: string) {
    return this.stays.publicInfo(id);
  }

  @Get("property/:id/quote")
  quote(@Param("id") id: string, @Query() q: Record<string, string>) {
    return this.stays.quote(id, { checkIn: clip(q.checkIn), checkOut: clip(q.checkOut), guests: int(q.guests) });
  }

  @Get("property/:id/reviews")
  reviews(@Param("id") id: string) {
    return this.stays.reviews(id);
  }

  /** Calendrier exporté (lien secret à coller dans Airbnb, Booking…). */
  @Get("ical/:file")
  @Header("Content-Type", "text/calendar; charset=utf-8")
  @Header("Cache-Control", "private, max-age=300")
  async ical(@Param("file") file: string) {
    const token = file.replace(/\.ics$/, "");
    if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) throw new NotFoundException("Calendrier introuvable.");
    const s = await this.prisma.staySettings.findUnique({
      where: { icalToken: token },
      select: { propertyId: true, property: { select: { title: true } } },
    });
    if (!s) throw new NotFoundException("Calendrier introuvable.");
    const from = todayDay();
    const [bookings, blocks] = await Promise.all([
      this.prisma.booking.findMany({
        where: { propertyId: s.propertyId, status: { in: BLOCKING_STATUSES }, checkOut: { gt: from } },
        select: { id: true, checkIn: true, checkOut: true },
      }),
      // Les fermetures importées ne sont pas réexportées (pas de boucle entre plateformes).
      this.prisma.stayBlock.findMany({
        where: { propertyId: s.propertyId, source: "MANUAL", endDate: { gt: from } },
        select: { id: true, startDate: true, endDate: true },
      }),
    ]);
    return buildIcal(`hwe — ${s.property.title}`, [
      ...bookings.map((b) => ({ uid: `${b.id}@hwe`, start: b.checkIn, end: b.checkOut, summary: "Réservé (hwe)" })),
      ...blocks.map((b) => ({ uid: `${b.id}@hwe`, start: b.startDate, end: b.endDate, summary: "Indisponible (hwe)" })),
    ]);
  }

  // ── Voyageur ──
  @UseGuards(JwtAuthGuard)
  @Post("bookings")
  request(@CurrentUser() user: JwtPayload, @Body() dto: BookingRequestInput) {
    return this.stays.request(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("bookings/my")
  my(@CurrentUser() user: JwtPayload) {
    return this.stays.myBookings(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get("bookings/:id")
  get(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.stays.getBooking(id, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("bookings/:id/cancel")
  cancel(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: CancelInput) {
    return this.stays.cancelByGuest(id, user.sub, dto.reason);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("bookings/:id/declare-payment")
  declare(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: DeclarePaymentInput) {
    return this.stays.declarePayment(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("bookings/:id/review")
  review(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: ReviewInput) {
    return this.stays.review(id, user.sub, dto);
  }

  // ── Hôte (propriétaire, ou pro sous mandat de gestion) ──
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Get("host/properties")
  hostProperties(@CurrentUser() user: JwtPayload) {
    return this.stays.hostProperties(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Get("host/bookings")
  hostBookings(
    @CurrentUser() user: JwtPayload,
    @Query("status", statusPipe) status?: BookingStatus,
    @Query("propertyId") propertyId?: string,
  ) {
    return this.stays.hostBookings(user.sub, { status, propertyId: clip(propertyId) });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Get("host/property/:id/settings")
  settings(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.stays.hostSettings(id, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Put("host/property/:id/settings")
  saveSettings(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: StaySettingsInput) {
    return this.stays.saveSettings(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Post("host/property/:id/ical-token")
  icalToken(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.stays.regenerateIcalToken(id, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Post("host/property/:id/ical-sync")
  async icalSync(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    await this.stays.hostSettings(id, user.sub);
    return this.scheduler.syncOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Get("host/property/:id/calendar")
  calendar(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Query("from") from?: string, @Query("to") to?: string) {
    return this.stays.hostCalendar(id, user.sub, clip(from), clip(to));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Post("host/property/:id/blocks")
  addBlock(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: BlockInput) {
    return this.stays.addBlock(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Delete("host/blocks/:id")
  removeBlock(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.stays.removeBlock(id, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/bookings/:id/accept")
  accept(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: HostNoteInput) {
    return this.stays.accept(id, user.sub, dto.note);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/bookings/:id/decline")
  decline(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: HostNoteInput) {
    return this.stays.decline(id, user.sub, dto.note);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/bookings/:id/confirm-payment")
  confirmPayment(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.stays.confirmPayment(id, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/bookings/:id/reject-payment")
  rejectPayment(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: HostNoteInput) {
    return this.stays.rejectPayment(id, user.sub, dto.note);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/bookings/:id/cancel")
  hostCancel(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: HostCancelInput) {
    return this.stays.cancelByHost(id, user.sub, dto.reason);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Patch("host/reviews/:id/reply")
  reply(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: ReplyInput) {
    return this.stays.replyReview(id, user.sub, dto.reply);
  }

  // ── Administration ──
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("admin/overview")
  adminOverview() {
    return this.stays.adminOverview();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch("admin/reviews/:id")
  hide(@Param("id") id: string, @Body() dto: HiddenInput) {
    return this.stays.setReviewHidden(id, dto.hidden);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put("admin/commission")
  commission(@Body() dto: CommissionInput) {
    return this.stays.setCommission(dto.commissionPct);
  }
}
