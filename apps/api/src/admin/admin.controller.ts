import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PropertyStatus, Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { AdminService } from "./admin.service";
import { AgenciesService } from "../agencies/agencies.service";
import { IsEnum } from "class-validator";

class PropertyStatusDto {
  @IsEnum(PropertyStatus) status!: PropertyStatus;
}

const clip = (q?: string) => (typeof q === "string" && q.trim() ? q.trim().slice(0, 100) : undefined);

/** Interface d'administration : statistiques, comptes, modération d'annonces.
 * Aucun endpoint public ne crée d'ADMIN — le premier compte se crée en base. */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("admin")
export class AdminController {
  constructor(
    private readonly admin: AdminService,
    private readonly agencies: AgenciesService,
  ) {}

  /** Agences (responsables, membres, mandats actifs). */
  @Get("agencies")
  agencyList(@Query("q") q?: string) {
    return this.agencies.adminList(clip(q));
  }

  @Get("overview")
  overview() {
    return this.admin.overview();
  }

  @Get("users")
  users(@Query("q") q?: string, @Query("role") role?: string) {
    const parsedRole =
      role && Object.values(Role).includes(role as Role) ? (role as Role) : undefined;
    return this.admin.users(clip(q), parsedRole);
  }

  @Get("properties")
  properties(@Query("q") q?: string, @Query("status") status?: string) {
    const parsed =
      status && Object.values(PropertyStatus).includes(status as PropertyStatus)
        ? (status as PropertyStatus)
        : undefined;
    return this.admin.properties(clip(q), parsed);
  }

  @Patch("users/:id/verify-email")
  verifyUserEmail(@Param("id") id: string) {
    return this.admin.verifyUserEmail(id);
  }

  @Patch("properties/:id/status")
  setPropertyStatus(@Param("id") id: string, @Body() dto: PropertyStatusDto) {
    return this.admin.setPropertyStatus(id, dto.status);
  }
}
