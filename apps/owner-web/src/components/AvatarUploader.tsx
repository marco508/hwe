"use client";

import * as React from "react";

interface AvatarUploaderProps {
  value: string | null | undefined;
  onChange: (dataUrl: string) => void;
  firstName?: string;
  lastName?: string;
}

export function AvatarUploader({ value, onChange, firstName, lastName }: AvatarUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : "?";

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar preview */}
      <div
        className={`relative w-24 h-24 rounded-full overflow-hidden border-2 transition-colors cursor-pointer ${
          dragging ? "border-brand-500 bg-brand-50" : "border-border bg-surface-2"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        title="Cliquer pour changer la photo"
      >
        {value ? (
          <img
            src={value}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-700 font-display text-2xl font-bold select-none">
            {initials}
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
          <span className="text-white text-xs font-medium text-center px-1">
            📷 Modifier
          </span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-xs text-brand-600 hover:text-brand-800 font-medium underline"
      >
        Changer la photo
      </button>
    </div>
  );
}
