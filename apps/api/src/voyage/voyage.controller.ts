import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { VoyageService } from "./voyage.service";
import { TripsService } from "./trips.service";
import {
  CircuitInput,
  DestinationInput,
  EventInput,
  FromCircuitInput,
  GuideInput,
  ImageInput,
  PlaceInput,
  TripInput,
  TripItemInput,
  TripReorderInput,
} from "./voyage.dto";

const clip = (v?: string) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 100) : undefined);
const CC = /^[A-Za-z]{2}$/;

/** Guides Voyage (public) et leur administration. */
@Controller("voyage")
export class VoyageController {
  constructor(private readonly voyage: VoyageService) {}

  @Get("countries")
  countries() {
    return this.voyage.countries();
  }

  @Get("countries/:cc")
  country(@Param("cc") cc: string) {
    return this.voyage.country(CC.test(cc) ? cc : "XX");
  }

  @Get("countries/:cc/events")
  countryEvents(@Param("cc") cc: string, @Query("from") from?: string, @Query("to") to?: string) {
    return this.voyage.countryEvents(CC.test(cc) ? cc : "XX", { from, to });
  }

  @Get("events/:slug")
  event(@Param("slug") slug: string) {
    return this.voyage.event(slug.slice(0, 80));
  }

  @Get("destinations/:slug")
  destination(@Param("slug") slug: string) {
    return this.voyage.destination(slug.slice(0, 80));
  }

  @Get("places")
  places(@Query() q: Record<string, string>) {
    return this.voyage.places({
      country: clip(q.country),
      destination: clip(q.destination),
      category: clip(q.category),
      q: clip(q.q),
      take: q.take && /^\d{1,3}$/.test(q.take) ? Number(q.take) : undefined,
    });
  }

  @Get("places/:slug")
  place(@Param("slug") slug: string) {
    return this.voyage.place(slug.slice(0, 80));
  }

  @Get("circuits/:slug")
  circuit(@Param("slug") slug: string) {
    return this.voyage.circuit(slug.slice(0, 80));
  }

  // ── Administration ──
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("admin/content")
  adminContent(@Query("country") country?: string) {
    return this.voyage.adminContent(country && CC.test(country) ? country : undefined);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("admin/images")
  upload(@Body() dto: ImageInput) {
    return this.voyage.uploadImage(dto.dataUrl);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put("admin/guides/:cc")
  guide(@Param("cc") cc: string, @Body() dto: GuideInput) {
    return this.voyage.saveGuide(CC.test(cc) ? cc : "XX", dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("admin/destinations")
  createDestination(@Body() dto: DestinationInput) {
    return this.voyage.createDestination(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch("admin/destinations/:id")
  updateDestination(@Param("id") id: string, @Body() dto: DestinationInput) {
    return this.voyage.updateDestination(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("admin/destinations/:id")
  deleteDestination(@Param("id") id: string) {
    return this.voyage.deleteDestination(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("admin/places")
  createPlace(@Body() dto: PlaceInput) {
    return this.voyage.createPlace(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch("admin/places/:id")
  updatePlace(@Param("id") id: string, @Body() dto: PlaceInput) {
    return this.voyage.updatePlace(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("admin/places/:id")
  deletePlace(@Param("id") id: string) {
    return this.voyage.deletePlace(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("admin/events")
  createEvent(@Body() dto: EventInput) {
    return this.voyage.createEvent(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch("admin/events/:id")
  updateEvent(@Param("id") id: string, @Body() dto: EventInput) {
    return this.voyage.updateEvent(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("admin/events/:id")
  deleteEvent(@Param("id") id: string) {
    return this.voyage.deleteEvent(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("admin/circuits")
  createCircuit(@Body() dto: CircuitInput) {
    return this.voyage.saveCircuit(null, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch("admin/circuits/:id")
  updateCircuit(@Param("id") id: string, @Body() dto: CircuitInput) {
    return this.voyage.saveCircuit(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("admin/circuits/:id")
  deleteCircuit(@Param("id") id: string) {
    return this.voyage.deleteCircuit(id);
  }
}

/** Carnets de voyage (compte connecté) ; lecture d'un carnet partagé (public). */
@Controller("trips")
export class TripsController {
  constructor(private readonly trips: TripsService) {}

  @Get("shared/:token")
  shared(@Param("token") token: string) {
    return this.trips.shared(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.trips.list(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: TripInput) {
    return this.trips.create(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("from-circuit/:slug")
  fromCircuit(@CurrentUser() user: JwtPayload, @Param("slug") slug: string, @Body() dto: FromCircuitInput) {
    return this.trips.fromCircuit(user.sub, slug.slice(0, 80), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  get(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.trips.get(id, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: TripInput) {
    return this.trips.update(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.trips.remove(id, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/items")
  addItem(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: TripItemInput) {
    return this.trips.addItem(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/reorder")
  reorder(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Body() dto: TripReorderInput) {
    return this.trips.reorder(id, user.sub, dto.day, dto.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/items/:itemId")
  updateItem(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Param("itemId") itemId: string, @Body() dto: TripItemInput) {
    return this.trips.updateItem(id, itemId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/items/:itemId")
  removeItem(@CurrentUser() user: JwtPayload, @Param("id") id: string, @Param("itemId") itemId: string) {
    return this.trips.removeItem(id, itemId, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/share")
  share(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.trips.share(id, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/share")
  unshare(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.trips.unshare(id, user.sub);
  }
}
