import { Module } from "@nestjs/common";
import {
  AdminSubscriptionsController,
  AgencySubscriptionController,
  OwnerSubscriptionController,
  PlansController,
} from "./subscriptions.controller";
import { SubscriptionsService } from "./subscriptions.service";

/** Abonnement des professionnels (paiement manuel, phase 1). */
@Module({
  controllers: [PlansController, AgencySubscriptionController, OwnerSubscriptionController, AdminSubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
