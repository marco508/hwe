import { IsString } from "class-validator";

export class StartConversationDto {
  @IsString()
  propertyId!: string;
}
