import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DkpAuthController, DkpConfigController } from "./dkp-auth.controller";
import { PartnersController, RentShareController, RentShareService } from "./rent-share.controller";
import { GestiproController, GestiproService } from "./gestipro.controller";

/**
 * Écosystème DKP Solution : Compte DKP, ponts vers les autres apps
 * (FamiLyfe, GestiPro), configuration publique des liens. Les e-mails par le
 * hub sont dans MailerService, le paiement en ligne dans SubscriptionsService.
 */
@Module({
  imports: [AuthModule],
  controllers: [DkpConfigController, DkpAuthController, RentShareController, PartnersController, GestiproController],
  providers: [RentShareService, GestiproService],
})
export class DkpModule {}
