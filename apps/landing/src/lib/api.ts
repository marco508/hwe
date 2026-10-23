import { commonApi } from "@hwe/ui";

/** API publique utilisée par la landing (client partagé @hwe/ui). */
export const publicApi = {
  listProperties: commonApi.listProperties,
  propertyStats: commonApi.propertyStats,
};
