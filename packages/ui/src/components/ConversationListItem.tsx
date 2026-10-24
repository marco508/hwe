import * as React from "react";
import { cn } from "../utils";
import { UnreadBadge } from "./UnreadBadge";
import { SafeImage } from "./SafeImage";
import { timeAgo } from "../client/format";

export interface ConversationListItemProps {
  partnerName: string;
  partnerInitials?: string;
  partnerAvatarUrl?: string | null;
  /** Title of the property the conversation is about. */
  propertyTitle?: string;
  propertyImageUrl?: string | null;
  /** Listing context badge. */
  listingType?: "SALE" | "RENT";
  /** Last message snippet. */
  lastMessage?: string;
  /** ISO timestamp of last message. */
  lastMessageAt?: string | null;
  /** Number of unread messages for current user. */
  unreadCount?: number;
  active?: boolean;
  onClick?: () => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  partnerName,
  partnerInitials = "?",
  partnerAvatarUrl,
  propertyTitle,
  propertyImageUrl,
  listingType,
  lastMessage,
  lastMessageAt,
  unreadCount = 0,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-start flex items-start gap-3 px-3 py-3 rounded-xl transition-colors group",
        active
          ? "bg-cream-200/60 dark:bg-brand-900/30"
          : "hover:bg-cream-100 dark:hover:bg-white/[0.04]",
      )}
    >
      {/* Avatar */}
      <span className="relative shrink-0">
        <span className="block h-11 w-11 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center overflow-hidden">
          <SafeImage
            src={partnerAvatarUrl}
            alt={partnerName}
            className="h-full w-full object-cover"
            fallbackClassName="h-full w-full from-brand-600 to-accent-500 text-white"
            fallback={partnerInitials}
          />
        </span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -end-1">
            <UnreadBadge count={unreadCount} />
          </span>
        )}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-medium text-sm truncate",
              unreadCount > 0 ? "text-ink" : "text-ink",
            )}
          >
            {partnerName}
          </span>
          <span className="text-[10px] text-ink-subtle shrink-0">
            {timeAgo(lastMessageAt)}
          </span>
        </div>
        {propertyTitle && (
          <div className="flex items-center gap-1 text-[11px] text-ink-muted truncate">
            {listingType && (
              <span
                className={cn(
                  "shrink-0 inline-block h-1.5 w-1.5 rounded-full",
                  listingType === "SALE" ? "bg-accent-500" : "bg-brand-500",
                )}
              />
            )}
            <span className="truncate">{propertyTitle}</span>
          </div>
        )}
        {lastMessage && (
          <div
            className={cn(
              "text-xs truncate mt-1",
              unreadCount > 0
                ? "text-ink font-medium"
                : "text-ink-muted",
            )}
          >
            {lastMessage}
          </div>
        )}
      </div>

      {propertyImageUrl && (
        <SafeImage
          src={propertyImageUrl}
          alt={propertyTitle ?? ""}
          loading="lazy"
          className="h-12 w-12 rounded-lg object-cover ring-1 ring-border shrink-0"
          fallback={<span className="text-[10px] font-display">hwe</span>}
        />
      )}
    </button>
  );
};
