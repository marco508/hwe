import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaFilesService } from "./media-files.service";

@Module({
  controllers: [MediaController],
  providers: [MediaFilesService],
})
export class MediaModule {}
