import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { LeasesService } from "./leases.service";
import {
  CreateLeaseDto,
  UpdateLeaseDto,
  LeaseDepositDto,
  GiveNoticeDto,
  CreateAmendmentDto,
  CoTenantDto,
  InsuranceDto,
  OwnerNoticeDto,
  ChargeRegularizationDto,
} from "./dto/lease.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";

/** Endpoints « côté locataire » : ses propres baux.
 * OWNER inclus — un propriétaire peut aussi être locataire d'un autre bien. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TENANT, Role.OWNER, Role.ADMIN)
@Controller("leases")
export class TenantLeasesController {
  constructor(private readonly leases: LeasesService) {}

  @Get("my")
  my(@CurrentUser() user: JwtPayload) {
    return this.leases.findMyLeases(user.email, user.sub);
  }

  /** Le locataire signe électroniquement le bail. */
  @Post(":leaseId/sign")
  sign(
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.signByTenant(leaseId, user.email, user.sub);
  }

  /** Le locataire donne son préavis (date effective ≥ préavis contractuel). */
  @Post(":leaseId/notice")
  giveNotice(
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: GiveNoticeDto,
  ) {
    return this.leases.giveNotice(leaseId, user.email, user.sub, dto);
  }

  /** Avenants du bail (les deux parties). */
  @Get(":leaseId/amendments")
  amendments(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.leases.listAmendments(leaseId, user);
  }

  /** Le locataire signe un avenant — appliqué immédiatement. */
  @Post(":leaseId/amendments/:amendmentId/sign")
  signAmendment(
    @Param("leaseId") leaseId: string,
    @Param("amendmentId") amendmentId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.signAmendment(leaseId, amendmentId, user);
  }

  /** Le colocataire connecté signe sa ligne. */
  @Post(":leaseId/cotenants/sign")
  signAsCoTenant(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.leases.signAsCoTenant(leaseId, user.email, user.sub);
  }

  /** Attestations d'assurance : dépôt (locataire) et liste (les deux). */
  @Post(":leaseId/insurances")
  addInsurance(
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: InsuranceDto,
  ) {
    return this.leases.addInsurance(leaseId, user, dto);
  }

  @Get(":leaseId/insurances")
  insurances(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.leases.listInsurances(leaseId, user);
  }

  @Get(":leaseId/insurances/:insuranceId/file")
  insuranceFile(
    @Param("leaseId") leaseId: string,
    @Param("insuranceId") insuranceId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.getInsuranceFile(leaseId, insuranceId, user);
  }

  /** Régularisations de charges (les deux parties). */
  @Get(":leaseId/charge-regularizations")
  chargeRegularizations(
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.listChargeRegularizations(leaseId, user);
  }
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN)
@Controller("properties/:propertyId/leases")
export class LeasesController {
  constructor(private readonly leases: LeasesService) {}

  @Get()
  list(
    @Param("propertyId") propertyId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.list(propertyId, user.sub);
  }

  @Get(":leaseId")
  findOne(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.findOne(propertyId, leaseId, user.sub);
  }

  @Post()
  create(
    @Param("propertyId") propertyId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateLeaseDto,
  ) {
    return this.leases.create(propertyId, user.sub, dto);
  }

  @Patch(":leaseId")
  update(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateLeaseDto,
  ) {
    return this.leases.update(propertyId, leaseId, user.sub, dto);
  }

  @Delete(":leaseId")
  remove(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.remove(propertyId, leaseId, user.sub);
  }


  /** Proposer un avenant (loyer, charges, durée) — signé ensuite par le locataire. */
  @Post(":leaseId/amendments")
  createAmendment(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateAmendmentDto,
  ) {
    return this.leases.createAmendment(propertyId, leaseId, user.sub, dto);
  }

  /** Colocation : ajouter / retirer un colocataire. */
  @Post(":leaseId/cotenants")
  addCoTenant(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CoTenantDto,
  ) {
    return this.leases.addCoTenant(propertyId, leaseId, user.sub, dto);
  }

  @Delete(":leaseId/cotenants/:coTenantId")
  removeCoTenant(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @Param("coTenantId") coTenantId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.removeCoTenant(propertyId, leaseId, user.sub, coTenantId);
  }


  /** Congé donné par le propriétaire (vente, reprise, motif légitime). */
  @Post(":leaseId/owner-notice")
  giveOwnerNotice(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: OwnerNoticeDto,
  ) {
    return this.leases.giveOwnerNotice(propertyId, leaseId, user.sub, dto);
  }

  /** Régularisation annuelle des charges. */
  @Post(":leaseId/charge-regularizations")
  createChargeRegularization(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: ChargeRegularizationDto,
  ) {
    return this.leases.createChargeRegularization(propertyId, leaseId, user.sub, dto);
  }

  /** Suivi de la caution : versée, restituée (avec retenue éventuelle). */
  @Post(":leaseId/deposit")
  deposit(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: LeaseDepositDto,
  ) {
    return this.leases.markDeposit(propertyId, leaseId, user.sub, dto);
  }

  /** Le propriétaire signe électroniquement le bail. */
  @Post(":leaseId/sign")
  sign(
    @Param("propertyId") propertyId: string,
    @Param("leaseId") leaseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.leases.signByOwner(propertyId, leaseId, user.sub);
  }
}
