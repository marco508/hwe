import { Module } from "@nestjs/common";
import { AgenciesModule } from "../agencies/agencies.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [AgenciesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
