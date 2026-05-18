import { Module } from "@nestjs/common";
import { InquiriesController } from "./inquiries.controller";
import { InquiriesService } from "./inquiries.service";
import { ConversationsModule } from "../conversations/conversations.module";

@Module({
  imports: [ConversationsModule],
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
