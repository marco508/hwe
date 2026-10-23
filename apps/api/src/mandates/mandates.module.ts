import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PropertiesModule } from "../properties/properties.module";
import { FeesController, MandatesController, StatementsController } from "./mandates.controller";
import { MandatesService } from "./mandates.service";

@Module({
  imports: [AuthModule, PropertiesModule],
  controllers: [MandatesController, FeesController, StatementsController],
  providers: [MandatesService],
})
export class MandatesModule {}
