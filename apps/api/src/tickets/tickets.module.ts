import { Module } from "@nestjs/common";
import { LeaseTicketsController, TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Module({
  controllers: [LeaseTicketsController, TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
