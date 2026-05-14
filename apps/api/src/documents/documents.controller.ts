import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser, JwtPayload } from "../auth/current-user.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN)
@Controller("properties/:propertyId/documents")
export class DocumentsController {
  constructor(private readonly documents: DocumentsService) {}

  @Get()
  list(
    @Param("propertyId") propertyId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.documents.list(propertyId, user.sub);
  }

  @Post()
  create(
    @Param("propertyId") propertyId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.documents.create(propertyId, user.sub, dto);
  }

  @Patch(":docId")
  update(
    @Param("propertyId") propertyId: string,
    @Param("docId") docId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: Partial<CreateDocumentDto>,
  ) {
    return this.documents.update(propertyId, docId, user.sub, dto);
  }

  @Delete(":docId")
  remove(
    @Param("propertyId") propertyId: string,
    @Param("docId") docId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.documents.remove(propertyId, docId, user.sub);
  }
}
