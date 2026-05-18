"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AnimatedBackground,
  Card,
  CardBody,
  ConversationListItem,
  EmptyState,
  MessageBubble,
  MessageComposer,
  useBrowserNotifications,
  useTitleFlash,
  cn,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import type { Conversation, Message } from "@hwe/types";

export const dynamic = "force-dynamic";

const POLL_INTERVAL_MS = 6000;

export default function MessagesPage() {
  return (
    <React.Suspense fallback={null}>
      <MessagesPageInner />
    </React.Suspense>
  );
}

function MessagesPageInner() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const activeId = params.get("c");

  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [loadingList, setLoadingList] = React.useState(true);
  const [active, setActive] = React.useState<Conversation | null>(null);
  const [loadingActive, setLoadingActive] = React.useState(false);
  const lastSeenMsgId = React.useRef<string | null>(null);
  const { permission, request, notify } = useBrowserNotifications();
  const totalUnread = React.useMemo(
    () =>
      conversations.reduce((s, c) => s + (c._count?.messages ?? 0), 0),
    [conversations],
  );
  useTitleFlash(totalUnread, "hwe — Propriétaire");

  // Redirect to login if not auth
  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  // Initial load + polling
  React.useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const fetchList = () => {
      api
        .listConversations()
        .then((items) => {
          if (cancelled) return;
          // Notif navigateur si un nouveau message arrive et que la page est
          // en arrière-plan
          if (items.length && conversations.length) {
            const newestMessages = items
              .flatMap((c) => (c.messages?.length ? [c.messages[0]] : []))
              .filter((m): m is Message => !!m)
              .filter((m) => m.senderId !== user.id);
            const latest = newestMessages.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )[0];
            if (latest && latest.id !== lastSeenMsgId.current) {
              const convo = items.find((c) => c.id === latest.conversationId);
              const author =
                latest.sender?.firstName ?? "Quelqu'un";
              notify(`Nouveau message de ${author}`, {
                body:
                  latest.content.length > 100
                    ? latest.content.slice(0, 100) + "…"
                    : latest.content,
                tag: latest.conversationId,
              });
              lastSeenMsgId.current = latest.id;
              // Refresh active conversation too
              if (convo && active && convo.id === active.id) {
                api.getConversation(active.id).then(setActive);
              }
            }
          }
          setConversations(items);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoadingList(false);
        });
    };
    fetchList();
    const id = setInterval(fetchList, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
    // We intentionally exclude `conversations` to avoid re-creating the
    // interval on every fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, active?.id]);

  // Load active conversation
  React.useEffect(() => {
    if (!activeId || !user) {
      setActive(null);
      return;
    }
    setLoadingActive(true);
    api
      .getConversation(activeId)
      .then((c) => {
        setActive(c);
        return api.markConversationRead(c.id);
      })
      .then(() => {
        // Refresh list to update unread counts
        api.listConversations().then(setConversations);
      })
      .finally(() => setLoadingActive(false));
  }, [activeId, user]);

  const onSelect = (id: string) => {
    router.push(`/dashboard/messages?c=${id}`);
  };

  const onSend = async (content: string) => {
    if (!active) return;
    const msg = await api.sendMessage(active.id, content);
    setActive({
      ...active,
      messages: [...(active.messages ?? []), msg],
      lastMessageAt: msg.createdAt,
    });
    // Refresh list to reorder
    api.listConversations().then(setConversations);
  };

  if (loading || !user) return null;

  return (
    <section>
      <AnimatedBackground
        variant="aurora"
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-6 mb-6"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="display-serif text-3xl">
              Messages <span className="gradient-text">en direct</span>
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              Discutez directement avec vos candidats acheteurs et locataires.
              {totalUnread > 0 && (
                <strong className="ml-1 text-ink">
                  {totalUnread} non lu{totalUnread > 1 ? "s" : ""}.
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
              🔔 Activer les notifications
            </button>
          )}
          {permission === "granted" && (
            <span className="text-xs text-ink-muted inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Notifications navigateur actives
            </span>
          )}
        </div>
      </AnimatedBackground>

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 min-h-[600px]">
        {/* Sidebar — liste des conversations */}
        <Card
          className={cn(
            "lg:max-h-[80vh] overflow-y-auto",
            active && "hidden lg:block",
          )}
        >
          <CardBody className="p-2">
            {loadingList ? (
              <div className="space-y-2 p-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl skeleton" />
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-6 text-center text-sm text-ink-muted">
                Aucune conversation pour le moment. Elles apparaîtront ici dès
                qu'un candidat vous contactera.
              </div>
            ) : (
              <div className="space-y-0.5">
                {conversations.map((c) => {
                  const partner = c.otherUser;
                  const initials =
                    partner?.firstName && partner?.lastName
                      ? `${partner.firstName[0]}${partner.lastName[0]}`.toUpperCase()
                      : "?";
                  const last = c.messages?.[0];
                  return (
                    <ConversationListItem
                      key={c.id}
                      partnerName={`${partner?.firstName ?? ""} ${partner?.lastName ?? ""}`.trim() || partner?.email || "Anonyme"}
                      partnerInitials={initials}
                      partnerAvatarUrl={partner?.avatarUrl}
                      propertyTitle={c.property?.title}
                      propertyImageUrl={c.property?.media?.[0]?.url}
                      listingType={c.property?.listingType}
                      lastMessage={last?.content}
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

        {/* Main — conversation active */}
        <Card
          className={cn(
            "flex flex-col lg:max-h-[80vh] overflow-hidden",
            !active && "hidden lg:flex",
          )}
        >
          {!active ? (
            loadingActive ? (
              <CardBody className="flex-1 flex items-center justify-center text-sm text-ink-muted">
                Chargement…
              </CardBody>
            ) : (
              <CardBody className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="text-5xl mb-3">💬</div>
                  <h2 className="display-serif text-2xl mb-2">
                    Sélectionnez une conversation
                  </h2>
                  <p className="text-sm text-ink-muted">
                    Choisissez un fil de discussion dans la liste pour voir les
                    messages et y répondre.
                  </p>
                </div>
              </CardBody>
            )
          ) : (
            <ActiveConversation
              conversation={active}
              currentUserId={user.id}
              onSend={onSend}
              onBack={() => router.push("/dashboard/messages")}
            />
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
}: {
  conversation: Conversation;
  currentUserId: string;
  onSend: (content: string) => Promise<void>;
  onBack?: () => void;
}) {
  const partner =
    conversation.ownerId === currentUserId
      ? conversation.otherUser
      : conversation.owner;
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll to bottom on new message
    const el = scrollerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [conversation.messages?.length]);

  return (
    <>
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center gap-3 bg-cream-50/60 dark:bg-surface/60">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour à la liste"
            className="lg:hidden h-8 w-8 rounded-full border border-border bg-surface hover:bg-cream-100 flex items-center justify-center text-ink shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center overflow-hidden shrink-0">
          {partner?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.avatarUrl}
              alt={partner.firstName}
              className="h-full w-full object-cover"
            />
          ) : (
            (partner?.firstName?.[0] ?? "?") + (partner?.lastName?.[0] ?? "")
          )}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-ink truncate">
            {partner?.firstName} {partner?.lastName}
          </div>
          {conversation.property && (
            <Link
              href={`/properties/${conversation.property.id}`}
              className="text-xs text-ink-muted hover:text-ink truncate inline-flex items-center gap-1.5"
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                  conversation.property.listingType === "SALE"
                    ? "bg-accent-500"
                    : "bg-brand-500"
                }`}
              />
              <span className="truncate">{conversation.property.title}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto p-5 space-y-3 bg-cream-50/30 dark:bg-background/30"
      >
        {(conversation.messages ?? []).length === 0 ? (
          <div className="text-center text-sm text-ink-muted py-8">
            Aucun message encore. Écrivez le premier !
          </div>
        ) : (
          (conversation.messages ?? []).map((m) => {
            const fromMe = m.senderId === currentUserId;
            const sender = m.sender;
            return (
              <MessageBubble
                key={m.id}
                content={m.content}
                fromMe={fromMe}
                authorName={
                  sender ? `${sender.firstName} ${sender.lastName}` : undefined
                }
                avatarUrl={sender?.avatarUrl}
                initials={
                  sender?.firstName && sender?.lastName
                    ? `${sender.firstName[0]}${sender.lastName[0]}`.toUpperCase()
                    : "?"
                }
                timestamp={m.createdAt}
                read={!!m.readAt}
              />
            );
          })
        )}
      </div>

      {/* Composer */}
      <div className="p-3 border-t border-border bg-surface">
        <MessageComposer onSend={onSend} placeholder="Votre réponse…" />
      </div>
    </>
  );
}
