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
import { CreateLeaseDto, UpdateLeaseDto } from "./dto/lease.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";

/** Endpoint accessible aux locataires : récupère ses propres baux actifs. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TENANT, Role.ADMIN)
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
