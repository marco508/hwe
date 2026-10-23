import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaModule } from "./prisma/prisma.module";
import { MailModule } from "./mail/mail.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PropertiesModule } from "./properties/properties.module";
import { InquiriesModule } from "./inquiries/inquiries.module";
import { DocumentsModule } from "./documents/documents.module";
import { LeasesModule } from "./leases/leases.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { PricingModule } from "./pricing/pricing.module";
import { ConversationsModule } from "./conversations/conversations.module";
import { RentsModule } from "./rents/rents.module";
import { InspectionsModule } from "./inspections/inspections.module";
import { TicketsModule } from "./tickets/tickets.module";
import { AdminModule } from "./admin/admin.module";
import { VisitsModule } from "./visits/visits.module";
import { MediaModule } from "./media/media.module";
import { HealthController } from "./health/health.controller";
import { AllExceptionsFilter } from "./common/all-exceptions.filter";
import { ResponseSanitizerInterceptor } from "./common/response-sanitizer.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MailModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    PropertiesModule,
    InquiriesModule,
    DocumentsModule,
    LeasesModule,
    FavoritesModule,
    PricingModule,
    ConversationsModule,
    RentsModule,
    InspectionsModule,
    TicketsModule,
    AdminModule,
    VisitsModule,
    MediaModule,
  ],
  controllers: [HealthController],
  providers: [
    // Format d'erreur unique + erreurs Prisma mappées (jamais de 500 sur entrée invalide)
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    // Défense en profondeur : aucune clé password/tokenVersion ne sort, médias en URL
    { provide: APP_INTERCEPTOR, useClass: ResponseSanitizerInterceptor },
  ],
})
export class AppModule {}
