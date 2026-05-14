import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PropertiesModule } from "./properties/properties.module";
import { InquiriesModule } from "./inquiries/inquiries.module";
import { DocumentsModule } from "./documents/documents.module";
import { LeasesModule } from "./leases/leases.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { PricingModule } from "./pricing/pricing.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PropertiesModule,
    InquiriesModule,
    DocumentsModule,
    LeasesModule,
    FavoritesModule,
    PricingModule,
  ],
})
export class AppModule {}
