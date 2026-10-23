"use client";

import * as React from "react";
import type { IdentityDocumentType, UserDocument } from "@hwe/types";
import { Button } from "./Button";
import { Card, CardBody, CardHeader } from "./Card";
import { Label } from "./Label";
import { tUi } from "./I18nKit";
import { toast } from "./Toast";
import { cn } from "../utils";
import { DOC_ACCEPT, DOC_MIME_TYPES, MAX_DOC_BYTES, openDataUrl, readFileAsDataUrl } from "../client/files";
import { fmtBytes } from "../client/format";

/**
 * Pièces d'identité / dossier (composant partagé owner + tenant, Q1).
 * - Choix de fichier accessible au clavier (<label htmlFor>, M1).
 * - Types et taille vérifiés AVANT l'envoi (S1/F11).
 * - « Voir » ouvre un Blob (jamais d'href data:, F12/S3).
 * - Erreurs affichées en toast (L3).
 */

const DOC_TYPES: IdentityDocumentType[] = [
  "NATIONAL_ID",
  "PASSPORT",
  "DRIVERS_LICENSE",
  "RESIDENCE_PERMIT",
  "INCOME_PROOF",
  "EMPLOYMENT_CONTRACT",
  "TAX_NOTICE",
  "GUARANTOR_ID",
  "GUARANTOR_INCOME",
  "OTHER",
];

const DOC_ICONS: Record<IdentityDocumentType, string> = {
  NATIONAL_ID: "🪪",
  PASSPORT: "📘",
  DRIVERS_LICENSE: "🚗",
  RESIDENCE_PERMIT: "📋",
  INCOME_PROOF: "💶",
  EMPLOYMENT_CONTRACT: "📝",
  TAX_NOTICE: "🏛",
  GUARANTOR_ID: "🤝",
  GUARANTOR_INCOME: "💶",
  OTHER: "📄",
};

export const docTypeLabel = (type: IdentityDocumentType) => tUi("ui.docType." + type);

export interface IdentityDocumentsProps {
  documents: UserDocument[];
  onAdd: (doc: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
  }) => Promise<void>;
  onDelete: (docId: string) => Promise<void>;
  /** Titre/sous-titre propres à l'app (ex. « Mon dossier »). */
  title?: string;
  subtitle?: string;
}

const fieldCls =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500";

export function IdentityDocuments({ documents, onAdd, onDelete, title, subtitle }: IdentityDocumentsProps) {
  const uid = React.useId();
  const [adding, setAdding] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<{ documentType: IdentityDocumentType; name: string }>({
    documentType: "NATIONAL_ID",
    name: "",
  });
  const [pendingFile, setPendingFile] = React.useState<{
    dataUrl: string;
    size: number;
    mimeType: string;
    originalName: string;
  } | null>(null);

  const reset = () => {
    setAdding(false);
    setPendingFile(null);
    setForm({ documentType: "NATIONAL_ID", name: "" });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!(DOC_MIME_TYPES as readonly string[]).includes(file.type)) {
      toast.error(tUi("ui.err.fileType"));
      return;
    }
    if (file.size > MAX_DOC_BYTES) {
      toast.error(tUi("ui.err.fileTooBig", { max: fmtBytes(MAX_DOC_BYTES) }));
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPendingFile({ dataUrl, size: file.size, mimeType: file.type, originalName: file.name });
      if (!form.name) setForm((f) => ({ ...f, name: file.name.replace(/\.[^/.]+$/, "") }));
    } catch (err) {
      toast.error(err);
    }
  };

  const submit = async () => {
    if (!pendingFile) return;
    setUploading(true);
    try {
      await onAdd({
        name: form.name.trim() || docTypeLabel(form.documentType),
        documentType: form.documentType,
        fileUrl: pendingFile.dataUrl,
        fileSize: pendingFile.size,
        mimeType: pendingFile.mimeType,
      });
      toast.success(tUi("ui.docs.added"));
      reset();
    } catch (err) {
      toast.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm(tUi("ui.docs.confirmDelete"))) return;
    setDeleting(docId);
    try {
      await onDelete(docId);
      toast.success(tUi("ui.docs.deleted"));
    } catch (err) {
      toast.error(err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium">{title ?? tUi("ui.docs.title")}</div>
            <div className="text-xs text-ink-muted mt-0.5">{subtitle ?? tUi("ui.docs.sub")}</div>
          </div>
          {!adding && (
            <Button size="sm" variant="secondary" onClick={() => setAdding(true)} className="shrink-0">
              {tUi("ui.docs.add")}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {adding && (
          <div className="mb-4 p-4 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`${uid}-type`}>{tUi("ui.docs.typeLabel")}</Label>
                <select
                  id={`${uid}-type`}
                  value={form.documentType}
                  onChange={(e) => setForm({ ...form, documentType: e.target.value as IdentityDocumentType })}
                  className={fieldCls}
                >
                  {DOC_TYPES.map((code) => (
                    <option key={code} value={code}>
                      {DOC_ICONS[code]} {docTypeLabel(code)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor={`${uid}-name`}>{tUi("ui.docs.nameLabel")}</Label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  maxLength={120}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={docTypeLabel(form.documentType)}
                  className={fieldCls}
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-ink">{tUi("ui.docs.fileLabel")}</span>
              {/* Vrai contrôle natif, stylé : utilisable au clavier et au toucher. */}
              <label
                htmlFor={`${uid}-file`}
                className={cn(
                  "mt-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-brand-500",
                  pendingFile
                    ? "border-brand-400 bg-brand-50 dark:bg-brand-900/30"
                    : "border-border hover:border-brand-300",
                )}
              >
                <input
                  id={`${uid}-file`}
                  type="file"
                  accept={DOC_ACCEPT}
                  className="sr-only"
                  onChange={handleFileChange}
                />
                {pendingFile ? (
                  <>
                    <span className="text-2xl" aria-hidden="true">
                      {pendingFile.mimeType.startsWith("image/") ? "🖼️" : "📄"}
                    </span>
                    <span className="text-sm font-medium text-ink [overflow-wrap:anywhere]">
                      {pendingFile.originalName}
                    </span>
                    <span className="text-ink-muted text-xs">{fmtBytes(pendingFile.size)}</span>
                    <span className="text-xs text-brand-700 dark:text-brand-300 underline mt-1">
                      {tUi("ui.docs.changeFile")}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl" aria-hidden="true">
                      📎
                    </span>
                    <span className="text-sm text-ink">{tUi("ui.docs.chooseFile")}</span>
                    <span className="text-xs text-ink-muted">{tUi("ui.docs.fileHint")}</span>
                  </>
                )}
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={!pendingFile || uploading} onClick={submit}>
                {uploading ? tUi("ui.docs.sending") : tUi("ui.docs.save")}
              </Button>
              <Button size="sm" variant="secondary" onClick={reset} disabled={uploading}>
                {tUi("ui.docs.cancel")}
              </Button>
            </div>
          </div>
        )}

        {documents.length === 0 && !adding ? (
          <p className="text-sm text-ink-muted text-center py-4">{tUi("ui.docs.empty")}</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-surface hover:bg-cream-100 dark:hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0" aria-hidden="true">
                    {DOC_ICONS[doc.documentType] ?? "📄"}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{doc.name}</div>
                    <div className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
                      <span>{docTypeLabel(doc.documentType)}</span>
                      {doc.fileSize ? <span>· {fmtBytes(doc.fileSize)}</span> : null}
                      {doc.verifiedAt && (
                        <span className="text-success font-medium">{tUi("ui.docs.verified")}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (!openDataUrl(doc.fileUrl, doc.name)) toast.error(tUi("ui.err.openDoc"));
                    }}
                    className="text-xs text-brand-700 dark:text-brand-300 hover:underline font-medium"
                  >
                    {tUi("ui.docs.view")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(doc.id)}
                    disabled={deleting === doc.id}
                    className="text-xs text-danger hover:underline font-medium disabled:opacity-50"
                  >
                    {deleting === doc.id ? "…" : tUi("ui.docs.delete")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
