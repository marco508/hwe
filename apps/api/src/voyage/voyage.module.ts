import { Module } from "@nestjs/common";
import { TripsController, VoyageController } from "./voyage.controller";
import { VoyageService } from "./voyage.service";
import { TripsService } from "./trips.service";
import { VoyageSeedService } from "./voyage-seed.service";
import { StaysController } from "../stays/stays.controller";
import { StaysService } from "../stays/stays.service";
import { StaysSchedulerService } from "../stays/stays-scheduler.service";

/** Espace Voyage : guides, carnets de voyage, séjours courte durée. */
@Module({
  controllers: [VoyageController, TripsController, StaysController],
  providers: [VoyageService, TripsService, VoyageSeedService, StaysService, StaysSchedulerService],
})
export class VoyageModule {}
