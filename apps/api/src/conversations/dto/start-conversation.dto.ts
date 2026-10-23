import { IsString, MaxLength } from "class-validator";

export class StartConversationDto {
  @IsString()
  @MaxLength(64)
  propertyId!: string;
}
