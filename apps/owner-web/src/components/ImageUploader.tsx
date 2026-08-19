"use client";

import * as React from "react";
import { t } from "../lib/i18n";

interface ImageUploaderProps {
  value: string[]; // base64 data URLs or existing URLs
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ value, onChange, maxImages = 10 }: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(t("pf.up.readError")));
      reader.readAsDataURL(file);
    });

  const addFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const remaining = maxImages - value.length;
    const toProcess = arr.slice(0, remaining);
    if (toProcess.length === 0) return;

    try {
      const dataUrls = await Promise.all(toProcess.map(fileToDataUrl));
      onChange([...value, ...dataUrls]);
    } catch {
      alert(t("pf.up.loadError"));
    }
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    const tmp = next[index - 1] as string;
    next[index - 1] = next[index] as string;
    next[index] = tmp;
    onChange(next);
  };

  const moveRight = (index: number) => {
    if (index === value.length - 1) return;
    const next = [...value];
    const tmp = next[index + 1] as string;
    next[index + 1] = next[index] as string;
    next[index] = tmp;
    onChange(next);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const canAdd = value.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {canAdd && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={[
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors py-10 px-4 text-center select-none",
            dragging
              ? "border-brand-500 bg-brand-50"
              : "border-border bg-surface hover:border-brand-400 hover:bg-surface",
          ].join(" ")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-ink-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm font-medium text-ink">
            {t("pf.up.drop")}{" "}
            <span className="text-brand-600 underline">{t("pf.up.browse")}</span>
          </p>
          <p className="text-xs text-ink-muted">
            {t("pf.up.formats", { max: maxImages })}{" "}
            {value.length > 0 &&
              t(value.length > 1 ? "pf.up.addedPlural" : "pf.up.added", {
                n: value.length,
                max: maxImages,
              })}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-border aspect-square bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={t("pf.up.photoAlt", { n: i + 1 })}
                className="w-full h-full object-cover"
              />

              {/* Position badge */}
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-brand-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  {t("pf.up.main")}
                </span>
              )}

              {/* Hover controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {/* Move left */}
                <button
                  type="button"
                  onClick={() => moveLeft(i)}
                  disabled={i === 0}
                  title={t("pf.up.moveLeft")}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  title={t("pf.up.delete")}
                  className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-600 text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Move right */}
                <button
                  type="button"
                  onClick={() => moveRight(i)}
                  disabled={i === value.length - 1}
                  title={t("pf.up.moveRight")}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Add more slot */}
          {canAdd && value.length > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-brand-400 hover:bg-brand-50 transition-colors flex flex-col items-center justify-center gap-1 text-ink-muted hover:text-brand-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs font-medium">{t("pf.up.add")}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
