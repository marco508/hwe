import { Controller, Get, Header } from "@nestjs/common";
import { FxService } from "./fx.service";

/** GET /api/fx — taux de change publics (base EUR), avec cache HTTP. */
@Controller("fx")
export class FxController {
  constructor(private readonly fx: FxService) {}

  @Get()
  @Header("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400")
  latest() {
    return this.fx.latest();
  }
}
