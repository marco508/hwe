// Client API & utilitaires partagés par owner-web, tenant-web et landing.
export { API_URL, OWNER_URL, TENANT_URL, LANDING_URL } from "./config";
export {
  ApiError,
  isApiError,
  errorText,
  parseErrorBody,
  isSubscriptionError,
  registerSubscriptionDialog,
  SUBSCRIPTION_ERROR_CODES,
} from "./errors";
export {
  tokenStore,
  request,
  rawRequest,
  json,
  qs,
  safeNext,
  loginHref,
  AUTH_EVENTS,
  type RequestOptions,
} from "./http";
export { commonApi, downloadBlob, downloadText, type CommonApi } from "./common-api";
export { createAuth, useAuth, useOptionalAuth, WRONG_ROLE, type AuthCtx } from "./auth";
export {
  fmtMoney,
  fmtDate,
  fmtDateTime,
  fmtBytes,
  timeAgo,
  intlLocale,
  priceUnitSuffix,
  paymentMethodLabel,
  planLabel,
} from "./format";
export {
  safeHref,
  openDataUrl,
  parseDataUrl,
  dataUrlToBlob,
  readFileAsDataUrl,
  compressImage,
  dataUrlBytes,
  DOC_ACCEPT,
  DOC_MIME_TYPES,
  IMAGE_ACCEPT,
  IMAGE_MIME_TYPES,
  MAX_DOC_BYTES,
  MAX_AVATAR_BYTES,
} from "./files";
export { useAsync, useLoginRedirect } from "./hooks";
export { otherParty, partnerName, partnerRole, landlordSide } from "./messaging";
