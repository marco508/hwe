import { Module } from "@nestjs/common";
import { LeasesController, TenantLeasesController } from "./leases.controller";
import { LeasesService } from "./leases.service";
import { LeaseSchedulerService } from "./lease-scheduler.service";

@Module({
  controllers: [LeasesController, TenantLeasesController],
  providers: [LeasesService, LeaseSchedulerService],
  exports: [LeaseSchedulerService],
})
export class LeasesModule {}
