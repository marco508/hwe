import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";
import { FavoritesService } from "./favorites.service";

@UseGuards(JwtAuthGuard)
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favorites: FavoritesService) {}

  /** List all favourited properties for the current user */
  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.favorites.list(user.sub);
  }

  /** Returns the set of propertyIds the user has saved — lightweight for UI */
  @Get("ids")
  ids(@CurrentUser() user: JwtPayload) {
    return this.favorites
      .listIds(user.sub)
      .then((set) => ({ ids: Array.from(set) }));
  }

  /** Add a property to favourites */
  @Post(":propertyId")
  add(
    @CurrentUser() user: JwtPayload,
    @Param("propertyId") propertyId: string,
  ) {
    return this.favorites.add(user.sub, propertyId);
  }

  /** Remove a property from favourites */
  @Delete(":propertyId")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("propertyId") propertyId: string,
  ) {
    return this.favorites.remove(user.sub, propertyId);
  }
}
