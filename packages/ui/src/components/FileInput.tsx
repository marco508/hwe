"use client";

import * as React from "react";
import { tUi } from "./I18nKit";
import { Icon } from "./Icon";

/**
 * Champ fichier traduit. Le bouton natif (« Choose File / No file chosen »)
 * affiche la langue du NAVIGATEUR, pas celle choisie dans hwe : on garde
 * l'input natif (accessible, `id` pour le <Label>, setInputFiles des tests)
 * visuellement masqué, et on montre un bouton et un nom de fichier traduits.
 */
export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
}

export function FileInput({ id, onChange, className = "", ...rest }: FileInputProps) {
  const [name, setName] = React.useState<string>("");
  return (
    <div className={`flex items-center gap-2 min-w-0 max-w-full ${className}`}>
      <input
        {...rest}
        id={id}
        type="file"
        className="sr-only peer"
        onChange={(e) => {
          const files = e.target.files;
          setName(files && files.length ? [...files].map((f) => f.name).join(", ") : "");
          onChange?.(e);
        }}
      />
      <label
        htmlFor={id}
        className="shrink-0 inline-flex items-center gap-1.5 cursor-pointer rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500"
      >
        <Icon name="paperclip" size={14} />
        {tUi("ui.file.choose")}
      </label>
      <span className="min-w-0 truncate text-xs text-ink-muted" data-file-name>
        {name || tUi("ui.file.none")}
      </span>
    </div>
  );
}
