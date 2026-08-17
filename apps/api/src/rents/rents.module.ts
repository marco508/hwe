import { Module } from "@nestjs/common";
import { RentsController } from "./rents.controller";
import { RentsService } from "./rents.service";
import { RentSchedulerService } from "./rent-scheduler.service";

@Module({
  controllers: [RentsController],
  providers: [RentsService, RentSchedulerService],
  exports: [RentsService],
})
export class RentsModule {}
