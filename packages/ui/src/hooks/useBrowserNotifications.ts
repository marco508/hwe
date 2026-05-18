"use client";

import * as React from "react";

export type NotificationPermissionState =
  | "default"
  | "granted"
  | "denied"
  | "unsupported";

/**
 * Hook pour demander la permission de notifications navigateur et envoyer
 * des notifications visuelles (toast OS) quand la page n'est pas active.
 *
 * Utilisation :
 *   const { permission, request, notify } = useBrowserNotifications();
 *   request(); // typiquement après une action utilisateur
 *   notify("Nouveau message", { body: "...", icon: "/icon.png" });
 */
export function useBrowserNotifications() {
  const [permission, setPermission] =
    React.useState<NotificationPermissionState>("default");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    setPermission(window.Notification.permission as NotificationPermissionState);
  }, []);

  const request = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window))
      return "unsupported" as const;
    if (window.Notification.permission !== "default") {
      return window.Notification.permission as NotificationPermissionState;
    }
    const result = await window.Notification.requestPermission();
    setPermission(result as NotificationPermissionState);
    return result as NotificationPermissionState;
  }, []);

  const notify = React.useCallback(
    (title: string, options: NotificationOptions = {}) => {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      if (window.Notification.permission !== "granted") return;
      // N'affiche pas si la page est visible — on jouera plutôt un son ou flash.
      if (typeof document !== "undefined" && !document.hidden) return;
      try {
        const n = new window.Notification(title, {
          ...options,
          icon: options.icon ?? "/favicon.ico",
        });
        n.onclick = () => {
          window.focus();
          n.close();
        };
      } catch {
        /* ignore */
      }
    },
    [],
  );

  return { permission, request, notify };
}

/**
 * Fait flasher le titre de l'onglet pour signaler des messages non lus.
 * Restaure le titre d'origine quand `count` revient à 0.
 */
export function useTitleFlash(count: number, baseTitle: string = "hwe") {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (!count) {
      document.title = baseTitle;
      return;
    }
    document.title = `(${count > 99 ? "99+" : count}) ${baseTitle}`;
  }, [count, baseTitle]);
}
