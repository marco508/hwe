"use client";

import * as React from "react";
import type { Conversation, Message } from "@hwe/types";
import { cn } from "../utils";
import { AnimatedBackground } from "./AnimatedBackground";
import { Card, CardBody } from "./Card";
import { ConversationListItem } from "./ConversationListItem";
import { MessageBubble } from "./MessageBubble";
import { MessageComposer } from "./MessageComposer";
import { SafeImage } from "./SafeImage";
import { ErrorState } from "./Feedback";
import { tUi } from "./I18nKit";
import { IlloEmpty } from "./Illustrations";
import { useBrowserNotifications, useTitleFlash } from "../hooks/useBrowserNotifications";
import { commonApi } from "../client/common-api";
import { useAuth } from "../client/auth";
import { isApiError } from "../client/errors";
import { otherParty, partnerName, partnerRole } from "../client/messaging";

/**
 * Messagerie partagée owner + tenant (Q1). Corrige au passage :
 * - F19 : l'interlocuteur est calculé selon que je suis le propriétaire ou non ;
 * - L4 : notifications basées sur des refs (plus de closure périmée) et
 *   initialisées au premier chargement (pas de notification d'un ancien message) ;
 * - L1/L3 : erreurs de chargement visibles + « Réessayer », échec d'envoi signalé ;
 * - P1 : sondage suspendu quand l'onglet est masqué.
 */

const POLL_INTERVAL_MS = 6000;

export interface MessagesViewProps {
  /** Conversation ouverte (paramètre ?c=). */
  activeId: string | null;
  /** Navigation vers une conversation (null = retour à la liste). */
  onSelect: (id: string | null) => void;
  /** Lien vers la fiche d'un bien. */
  propertyHref?: (propertyId: string) => string;
  title1: string;
  title2: string;
  subtitle: string;
  emptyText: string;
  /** Appel à l'action sous l'état vide de la liste (ex. « Parcourir les annonces »). */
  emptyAction?: React.ReactNode;
  /** Titre d'onglet pendant le clignotement « non lus ». */
  tabTitle?: string;
}

function initialsOf(p?: { firstName?: string; lastName?: string } | null) {
  return `${p?.firstName?.[0] ?? ""}${p?.lastName?.[0] ?? ""}`.toUpperCase() || "?";
}

export function MessagesView({
  activeId,
  onSelect,
  propertyHref,
  title1,
  title2,
  subtitle,
  emptyText,
  emptyAction,
  tabTitle = "hwe",
}: MessagesViewProps) {
  const { user } = useAuth();
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [listError, setListError] = React.useState<unknown>(null);
  const [loadingList, setLoadingList] = React.useState(true);
  const [active, setActive] = React.useState<Conversation | null>(null);
  const [activeError, setActiveError] = React.useState<unknown>(null);
  const [loadingActive, setLoadingActive] = React.useState(false);
  const [reloadTick, setReloadTick] = React.useState(0);
  const [activeTick, setActiveTick] = React.useState(0);

  const lastSeenMsgId = React.useRef<string | null>(null);
  const initialized = React.useRef(false);
  const activeRef = React.useRef<Conversation | null>(null);
  activeRef.current = active;

  const { permission, request, notify } = useBrowserNotifications();
  const totalUnread = React.useMemo(
    () => conversations.reduce((s, c) => s + (c._count?.messages ?? 0), 0),
    [conversations],
  );
  useTitleFlash(totalUnread, tabTitle);

  const meId = user?.id;

  const loadActive = React.useCallback(async (id: string, markRead = true) => {
    const c = await commonApi.getConversation(id);
    setActive(c);
    setActiveError(null);
    if (markRead) {
      try {
        await commonApi.markConversationRead(c.id);
      } catch {
        /* non bloquant */
      }
    }
    return c;
  }, []);

  // Liste + sondage (suspendu onglet masqué).
  React.useEffect(() => {
    if (!meId) return;
    let cancelled = false;

    const fetchList = async () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden" && initialized.current) return;
      try {
        const items = await commonApi.listConversations();
        if (cancelled) return;
        const newest = items
          .flatMap((c) => (c.messages?.length ? [c.messages[0]] : []))
          .filter((m): m is Message => !!m && m.senderId !== meId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        if (!initialized.current) {
          // Premier chargement : on mémorise sans notifier (L4).
          lastSeenMsgId.current = newest?.id ?? null;
          initialized.current = true;
        } else if (newest && newest.id !== lastSeenMsgId.current) {
          lastSeenMsgId.current = newest.id;
          notify(tUi("ui.msg.newFrom", { name: newest.sender?.firstName ?? tUi("ui.msg.someone") }), {
            body: newest.content.length > 100 ? newest.content.slice(0, 100) + "…" : newest.content,
            tag: newest.conversationId,
          });
          const cur = activeRef.current;
          if (cur && newest.conversationId === cur.id) {
            void loadActive(cur.id).catch(() => {});
          }
        }
        setConversations(items);
        setListError(null);
      } catch (e) {
        if (!cancelled) setListError(e);
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    };

    void fetchList();
    const id = setInterval(fetchList, POLL_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchList();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [meId, notify, loadActive, reloadTick]);

  // Conversation active.
  React.useEffect(() => {
    if (!activeId || !meId) {
      setActive(null);
      setActiveError(null);
      return;
    }
    let cancelled = false;
    setLoadingActive(true);
    setActiveError(null);
    loadActive(activeId)
      .then(() => commonApi.listConversations())
      .then((items) => {
        if (!cancelled) setConversations(items);
      })
      .catch((e) => {
        if (!cancelled) {
          setActive(null);
          setActiveError(e);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingActive(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeId, meId, loadActive, activeTick]);

  const onSend = async (content: string) => {
    if (!active) return;
    const msg = await commonApi.sendMessage(active.id, content);
    setActive((cur) =>
      cur && cur.id === active.id
        ? { ...cur, messages: [...(cur.messages ?? []), msg], lastMessageAt: msg.createdAt }
        : cur,
    );
    commonApi
      .listConversations()
      .then(setConversations)
      .catch(() => {});
  };

  if (!user) return null;

  const showThread = Boolean(activeId);

  return (
    <section className="min-w-0">
      <AnimatedBackground variant="aurora" className="rounded-2xl border border-border/60 px-5 sm:px-8 py-6 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h1 className="display-serif text-3xl">
              {title1} <span className="gradient-text">{title2}</span>
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              {subtitle}
              {totalUnread > 0 && (
                <strong className="ms-1 text-ink">
                  {tUi("ui.msg.unread", { count: totalUnread })}
                </strong>
              )}
            </p>
          </div>
          {permission === "default" && (
            <button
              type="button"
              onClick={request}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-ink text-cream-50 dark:bg-cream-50 dark:text-ink text-sm font-medium hover:opacity-90"
            >
              {tUi("ui.msg.enableNotifs")}
            </button>
          )}
          {permission === "granted" && (
            <span className="text-xs text-ink-muted inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {tUi("ui.msg.notifsOn")}
            </span>
          )}
        </div>
      </AnimatedBackground>

      <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-4 min-h-[60vh] lg:min-h-[600px]">
        {/* Liste des conversations */}
        <Card className={cn("lg:max-h-[80vh] overflow-y-auto min-w-0", showThread && "hidden lg:block")}>
          <CardBody className="p-2">
            {loadingList ? (
              <div className="space-y-2 p-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl skeleton" />
                ))}
              </div>
            ) : listError && conversations.length === 0 ? (
              <ErrorState compact error={listError} onRetry={() => setReloadTick((n) => n + 1)} />
            ) : conversations.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <IlloEmpty kind="chat" className="mx-auto mb-3 w-32" />
                <p className="text-sm text-ink-muted leading-relaxed">{emptyText}</p>
                {emptyAction && <div className="mt-4 flex justify-center">{emptyAction}</div>}
              </div>
            ) : (
              <div className="space-y-0.5">
                {conversations.map((c) => {
                  const partner = otherParty(c, meId);
                  return (
                    <ConversationListItem
                      key={c.id}
                      partnerName={partnerName(partner, tUi("ui.msg.anonymous"))}
                      partnerInitials={initialsOf(partner)}
                      partnerAvatarUrl={partner?.avatarUrl}
                      propertyTitle={c.property?.title}
                      propertyImageUrl={c.property?.media?.[0]?.url}
                      listingType={c.property?.listingType}
                      lastMessage={c.messages?.[0]?.content}
                      lastMessageAt={c.lastMessageAt}
                      unreadCount={c._count?.messages ?? 0}
                      active={active?.id === c.id}
                      onClick={() => onSelect(c.id)}
                    />
                  );
                })}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Conversation active */}
        <Card className={cn("flex flex-col lg:max-h-[80vh] overflow-hidden min-w-0", !showThread && "hidden lg:flex")}>
          {active ? (
            <ActiveConversation
              conversation={active}
              currentUserId={meId!}
              onSend={onSend}
              onBack={() => onSelect(null)}
              propertyHref={propertyHref}
            />
          ) : loadingActive ? (
            <CardBody className="flex-1 flex items-center justify-center text-sm text-ink-muted">
              {tUi("ui.loading")}
            </CardBody>
          ) : activeError ? (
            <CardBody className="flex-1 flex flex-col items-center justify-center gap-4">
              {isApiError(activeError) && (activeError.status === 404 || activeError.status === 403) ? (
                <p className="text-sm text-ink-muted">{tUi("ui.msg.notFound")}</p>
              ) : (
                <ErrorState compact error={activeError} onRetry={() => setActiveTick((n) => n + 1)} />
              )}
              <button type="button" onClick={() => onSelect(null)} className="text-sm underline text-ink-muted lg:hidden">
                {tUi("ui.msg.backToList")}
              </button>
            </CardBody>
          ) : (
            <CardBody className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <IlloEmpty kind="chat" className="mx-auto mb-3 w-40" />
                <h2 className="display-serif text-2xl mb-2">{tUi("ui.msg.selectTitle")}</h2>
                <p className="text-sm text-ink-muted">{tUi("ui.msg.selectSub")}</p>
              </div>
            </CardBody>
          )}
        </Card>
      </div>
    </section>
  );
}

function ActiveConversation({
  conversation,
  currentUserId,
  onSend,
  onBack,
  propertyHref,
}: {
  conversation: Conversation;
  currentUserId: string;
  onSend: (content: string) => Promise<void>;
  onBack: () => void;
  propertyHref?: (id: string) => string;
}) {
  const partner = otherParty(conversation, currentUserId);
  const role = partnerRole(conversation, currentUserId);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [conversation.messages?.length]);

  return (
    <>
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center gap-3 bg-cream-50/60 dark:bg-surface/60">
        <button
          type="button"
          onClick={onBack}
          aria-label={tUi("ui.msg.backToList")}
          className="lg:hidden h-8 w-8 rounded-full border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/5 flex items-center justify-center text-ink shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center overflow-hidden shrink-0">
          <SafeImage
            src={partner?.avatarUrl}
            alt={partner?.firstName ?? ""}
            className="h-full w-full object-cover"
            fallbackClassName="h-full w-full from-brand-600 to-accent-500 text-white"
            fallback={initialsOf(partner)}
          />
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-ink truncate">
            {partnerName(partner, tUi("ui.msg.anonymous"))}
            <span className="text-xs font-normal text-ink-muted ms-2">
              · {role === "owner" ? tUi("ui.msg.roleOwner") : tUi("ui.msg.roleContact")}
            </span>
          </div>
          {conversation.property && (
            <a
              href={propertyHref ? propertyHref(conversation.property.id) : `/properties/${conversation.property.id}`}
              className="text-xs text-ink-muted hover:text-ink max-w-full inline-flex items-center gap-1.5 min-w-0"
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                  conversation.property.listingType === "SALE" ? "bg-accent-500" : "bg-brand-500"
                }`}
              />
              <span className="truncate">{conversation.property.title}</span>
            </a>
          )}
        </div>
      </div>

      <div ref={scrollerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5 space-y-3 bg-cream-50/30 dark:bg-background/30 min-h-[40vh]">
        {(conversation.messages ?? []).length === 0 ? (
          <div className="text-center text-sm text-ink-muted py-8">{tUi("ui.msg.noMessages")}</div>
        ) : (
          (conversation.messages ?? []).map((m) => {
            const sender = m.sender;
            return (
              <MessageBubble
                key={m.id}
                content={m.content}
                fromMe={m.senderId === currentUserId}
                authorName={
                  sender
                    ? `${sender.firstName} ${sender.lastName}${sender.agency?.name ? ` (${sender.agency.name})` : ""}`
                    : undefined
                }
                avatarUrl={sender?.avatarUrl}
                initials={initialsOf(sender)}
                timestamp={m.createdAt}
                read={!!m.readAt}
              />
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-border bg-surface">
        <MessageComposer onSend={onSend} />
      </div>
    </>
  );
}
