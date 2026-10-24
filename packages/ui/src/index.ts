export { cn } from "./utils";
export { Button } from "./components/Button";
export { Input } from "./components/Input";
export { Textarea } from "./components/Textarea";
export { Select } from "./components/Select";
export { Card, CardHeader, CardBody, CardFooter } from "./components/Card";
export { Badge } from "./components/Badge";
export { Navbar } from "./components/Navbar";
export { PropertyCard } from "./components/PropertyCard";
export { Label } from "./components/Label";
export { EmptyState } from "./components/EmptyState";
export { ThemeToggle } from "./components/ThemeToggle";
export { AnimatedBackground } from "./components/AnimatedBackground";
export { ImageCarousel } from "./components/ImageCarousel";
export { SectionHeading } from "./components/SectionHeading";
export { SearchComposer } from "./components/SearchComposer";
export type {
  SearchComposerValue,
  SearchComposerListing,
} from "./components/SearchComposer";
export { CategoryRail } from "./components/CategoryRail";
export type { CategoryRailItem } from "./components/CategoryRail";
export { StepsRail } from "./components/StepsRail";
export type { StepsRailItem } from "./components/StepsRail";
export { RevealOnScroll } from "./components/RevealOnScroll";
export {
  LocationProvider,
  useLocation,
  SUPPORTED_COUNTRIES,
  DEFAULT_COUNTRY_CODE,
  ALL_COUNTRIES_CODE,
  ALL_COUNTRIES,
  REGION_LABELS,
  REGION_ORDER,
  groupCountriesByRegion,
} from "./components/LocationContext";
export type {
  Country,
  CountryRegion,
  LocationState,
  LocationProviderProps,
} from "./components/LocationContext";
export { CountryPicker } from "./components/CountryPicker";
export type { CountryPickerProps } from "./components/CountryPicker";
export { Stepper } from "./components/Stepper";
export type { StepperItem, StepperProps } from "./components/Stepper";
export { EnergyClassBadge } from "./components/EnergyClassBadge";
export type {
  EnergyClassLetter,
  EnergyClassBadgeProps,
} from "./components/EnergyClassBadge";
export { MessageBubble } from "./components/MessageBubble";
export type { MessageBubbleProps } from "./components/MessageBubble";
export { MessageComposer } from "./components/MessageComposer";
export type { MessageComposerProps } from "./components/MessageComposer";
export { UnreadBadge } from "./components/UnreadBadge";
export type { UnreadBadgeProps } from "./components/UnreadBadge";
export { ConversationListItem } from "./components/ConversationListItem";
export type { ConversationListItemProps } from "./components/ConversationListItem";
export { NotificationsBell } from "./components/NotificationsBell";
export type {
  NotificationsBellProps,
  BellPreviewItem,
} from "./components/NotificationsBell";
export {
  useBrowserNotifications,
  useTitleFlash,
} from "./hooks/useBrowserNotifications";
export type { NotificationPermissionState } from "./hooks/useBrowserNotifications";

export {
  CurrencyProvider,
  useCurrency,
  CurrencySwitch,
  SUPPORTED_CURRENCIES,
  INDICATIVE_RATES,
  RATES_DATE,
  convertAmount,
  CurrencyPicker,
  Approx,
  useRatesNote,
  currencyName,
  currencySymbol,
  announceCountryChoice,
  COUNTRY_CHOSEN_EVENT,
} from "./components/CurrencyKit";
export {
  createI18n,
  tUi,
  setUiLang,
  getUiLang,
  uiDir,
  UI_DICT,
  countryLabel,
  LangMenu,
  LANGS,
  LANG_INFO,
  LANG_EVENTS,
  LANG_COOKIE,
  requestLang,
  readPref,
  writePref,
  readCookie,
  prefCookieDomain,
  useDismiss,
  type Lang,
} from "./components/I18nKit";
export { Toaster, toast, type ToastTone } from "./components/Toast";
export { SafeImage, type SafeImageProps } from "./components/SafeImage";
export {
  ErrorState,
  isNotFound,
  EmailVerifyNotice,
  SessionBanners,
  NotFoundView,
  ErrorView,
} from "./components/Feedback";
export { IdentityDocuments, docTypeLabel, type IdentityDocumentsProps } from "./components/IdentityDocuments";
export { AvatarUploader, type AvatarUploaderProps } from "./components/AvatarUploader";
export { MessagesView, type MessagesViewProps } from "./components/MessagesView";
export { AgencyLogo, ManagedByBadge, InviteLinkBox } from "./components/ProKit";

// Client API, session, formatteurs, fichiers (partagés owner/tenant/landing).
export * from "./client";
export {
  IlloSkyline,
  IlloKeys,
  IlloSearchHome,
  IlloVisit,
  IlloManage,
  IlloEmpty,
  type EmptyIllo,
} from "./components/Illustrations";
export { Icon, IconBadge, ICON_NAMES, type IconName, type IconProps } from "./components/Icon";
export {
  Photo,
  PHOTOS,
  photoAttrs,
  photoAlt,
  cityPhotoId,
  propertyTypePhotoId,
  PropertyPlaceholder,
  CityCard,
  FEATURED_CITIES,
  type PhotoId,
  type PhotoProps,
} from "./components/Photos";
export { PropertyGallery, type PropertyGalleryProps } from "./components/PropertyGallery";
export { AuthSplit, type AuthSplitProps } from "./components/AuthSplit";
