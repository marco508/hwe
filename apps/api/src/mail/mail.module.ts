import { Global, Module } from "@nestjs/common";
import { MailerService } from "./mailer.service";

// Global : les e-mails partent des services métier comme des tâches
// planifiées, sans avoir à réimporter le module partout.
@Global()
@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailModule {}
