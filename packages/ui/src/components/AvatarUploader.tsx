"use client";

import * as React from "react";
import { tUi } from "./I18nKit";
import { Icon } from "./Icon";
import { toast } from "./Toast";
import { SafeImage } from "./SafeImage";
import { compressImage, dataUrlBytes, IMAGE_ACCEPT, IMAGE_MIME_TYPES, MAX_AVATAR_BYTES } from "../client/files";
import { fmtBytes } from "../client/format";

/**
 * Avatar (composant partagé owner + tenant, Q1/F6/F11).
 * Image recadrée/compressée côté client (≤ 2 Mo exigés par l'API),
 * bouton « Retirer » → onChange(null) (suppression explicite, contrat §14).
 */
export interface AvatarUploaderProps {
  value: string | null | undefined;
  onChange: (dataUrl: string | null) => void;
  firstName?: string;
  lastName?: string;
}

export function AvatarUploader({ value, onChange, firstName, lastName }: AvatarUploaderProps) {
  const uid = React.useId();
  const [dragging, setDragging] = React.useState(false);
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";

  const handleFile = async (file: File) => {
    if (!(IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) {
      toast.error(tUi("ui.err.imageType"));
      return;
    }
    try {
      const dataUrl = await compressImage(file, { maxSide: 512, quality: 0.85 });
      if (dataUrlBytes(dataUrl) > MAX_AVATAR_BYTES) {
        toast.error(tUi("ui.err.fileTooBig", { max: fmtBytes(MAX_AVATAR_BYTES) }));
        return;
      }
      onChange(dataUrl);
    } catch {
      toast.error(tUi("ui.err.imageRead"));
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label
        htmlFor={`${uid}-avatar`}
        className={`relative w-24 h-24 rounded-full overflow-hidden border-2 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-brand-500 ${
          dragging ? "border-brand-500 bg-brand-50" : "border-border bg-cream-100 dark:bg-white/5"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) void handleFile(file);
        }}
        title={tUi("ui.avatar.change")}
      >
        <SafeImage
          src={value}
          alt={tUi("ui.avatar.alt")}
          className="w-full h-full object-cover"
          fallbackClassName="w-full h-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-display text-2xl font-bold select-none"
          fallback={initials}
        />
        <span className="absolute inset-x-0 bottom-0 bg-black/45 text-white text-[10px] font-medium text-center py-1">
          <Icon name="camera" size={12} />
        </span>
        <input
          id={`${uid}-avatar`}
          type="file"
          accept={IMAGE_ACCEPT}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) void handleFile(file);
          }}
        />
      </label>

      <div className="flex items-center gap-3 text-xs">
        <label htmlFor={`${uid}-avatar`} className="text-brand-700 dark:text-brand-300 font-medium underline cursor-pointer">
          {tUi("ui.avatar.change")}
        </label>
        {value && (
          <button type="button" onClick={() => onChange(null)} className="text-danger font-medium underline">
            {tUi("ui.avatar.remove")}
          </button>
        )}
      </div>
      <p className="text-[11px] text-ink-subtle">{tUi("ui.avatar.hint")}</p>
    </div>
  );
}
