import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { PropertiesService } from "./properties.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { QueryPropertyDto } from "./dto/query-property.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { OptionalJwtAuthGuard } from "../auth/optional-jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";

@Controller("properties")
export class PropertiesController {
  constructor(private readonly properties: PropertiesService) {}

  // Public
  @Get()
  list(@Query() q: QueryPropertyDto) {
    return this.properties.list(q);
  }

  /** Compteurs de la landing — déclaré AVANT :id. */
  @Get("stats")
  stats() {
    return this.properties.stats();
  }

  // Owners only — déclaré AVANT :id.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get("mine/list")
  mine(@CurrentUser() user: JwtPayload) {
    return this.properties.listMine(user.sub);
  }

  /** Public ; le propriétaire connecté voit aussi ses brouillons/archives. */
  @UseGuards(OptionalJwtAuthGuard)
  @Get(":id")
  get(@Param("id") id: string, @CurrentUser() user: JwtPayload | null) {
    return this.properties.findById(id, user?.sub ?? null);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreatePropertyDto) {
    return this.properties.create(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Patch(":id")
  update(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.properties.update(user.sub, id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Delete(":id")
  remove(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.properties.remove(user.sub, id);
  }
}
