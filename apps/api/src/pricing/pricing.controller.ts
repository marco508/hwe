import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Role, LeaseDurationUnit } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { PricingService } from "./pricing.service";
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class RateDto {
  @IsEnum(LeaseDurationUnit) unit!: LeaseDurationUnit;
  @IsNumber({ allowNaN: false, allowInfinity: false }) @Min(0) @Max(1_000_000_000) amount!: number;
}

class UpsertRatesDto {
  @IsArray()
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => RateDto)
  rates!: RateDto[];
}

@Controller("properties/:propertyId/pricing")
export class PricingController {
  constructor(private readonly pricing: PricingService) {}

  /** GET /api/properties/:propertyId/pricing — public */
  @Get()
  list(@Param("propertyId") propertyId: string) {
    return this.pricing.list(propertyId);
  }

  /** PUT /api/properties/:propertyId/pricing — remplace toute la grille */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Put()
  upsert(
    @Param("propertyId") propertyId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpsertRatesDto,
  ) {
    return this.pricing.upsertMany(propertyId, user.sub, dto.rates);
  }

  /** DELETE /api/properties/:propertyId/pricing/:unit */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.AGENT)
  @Delete(":unit")
  remove(
    @Param("propertyId") propertyId: string,
    @Param(
      "unit",
      new ParseEnumPipe(LeaseDurationUnit, {
        exceptionFactory: () =>
          new BadRequestException(
            "Unité invalide (DAYS, WEEKS, MONTHS ou YEARS).",
          ),
      }),
    )
    unit: LeaseDurationUnit,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pricing.remove(propertyId, unit, user.sub);
  }
}
