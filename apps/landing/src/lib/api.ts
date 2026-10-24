import { commonApi, request } from "@hwe/ui";
import type { PublicPlans } from "@hwe/types";

/** API publique utilisée par la landing (client partagé @hwe/ui). */
export const publicApi = {
  listProperties: commonApi.listProperties,
  propertyStats: commonApi.propertyStats,
  /** Offres d'abonnement actives des professionnels (GET /plans). */
  plans: () => request<PublicPlans>("/plans"),
};
