import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { InspectionType } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { InspectionsService } from "./inspections.service";
import { UpsertInspectionDto } from "./dto/inspection.dto";

function parseType(raw: string): InspectionType {
  if (raw === "ENTRY" || raw === "EXIT") return raw;
  throw new BadRequestException("Type d'état des lieux invalide (ENTRY ou EXIT)");
}

/** États des lieux d'entrée et de sortie, rattachés à un bail.
 * L'accès (propriétaire / locataire) est contrôlé dans le service. */
@UseGuards(JwtAuthGuard)
@Controller("leases/:leaseId/inspections")
export class InspectionsController {
  constructor(private readonly inspections: InspectionsService) {}

  @Get()
  list(@Param("leaseId") leaseId: string, @CurrentUser() user: JwtPayload) {
    return this.inspections.list(leaseId, user);
  }

  @Put(":type")
  upsert(
    @Param("leaseId") leaseId: string,
    @Param("type") type: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpsertInspectionDto,
  ) {
    return this.inspections.upsert(leaseId, parseType(type), user, dto);
  }

  @Post(":type/sign")
  sign(
    @Param("leaseId") leaseId: string,
    @Param("type") type: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.inspections.sign(leaseId, parseType(type), user);
  }
}
