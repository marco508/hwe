import { Module } from "@nestjs/common";
import { LeasesController, TenantLeasesController } from "./leases.controller";
import { LeasesService } from "./leases.service";
import { LeaseSchedulerService } from "./lease-scheduler.service";
import { RentsModule } from "../rents/rents.module";

@Module({
  imports: [RentsModule],
  controllers: [LeasesController, TenantLeasesController],
  providers: [LeasesService, LeaseSchedulerService],
  exports: [LeaseSchedulerService, LeasesService],
})
export class LeasesModule {}
