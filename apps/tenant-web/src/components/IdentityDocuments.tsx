"use client";

import * as React from "react";
import { Button, Card, CardBody, CardHeader, Label } from "@hwe/ui";
import type { UserDocument, IdentityDocumentType } from "@hwe/types";
import { t } from "../lib/i18n";

/** Libellé traduit d'un type de document (remplace IDENTITY_DOCUMENT_TYPE_LABELS). */
const docTypeLabel = (type: IdentityDocumentType) => t("acc.docType." + type);

interface IdentityDocumentsProps {
  documents: UserDocument[];
  onAdd: (doc: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
  }) => Promise<void>;
  onDelete: (docId: string) => Promise<void>;
}

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

function formatBytes(bytes?: number | null) {
  if (!bytes) return null;
  if (bytes < 1024) return t("acc.docs.bytes", { n: bytes });
  if (bytes < 1024 * 1024) return t("acc.docs.kbytes", { n: (bytes / 1024).toFixed(0) });
  return t("acc.docs.mbytes", { n: (bytes / (1024 * 1024)).toFixed(1) });
}

export function IdentityDocuments({ documents, onAdd, onDelete }: IdentityDocumentsProps) {
  const [adding, setAdding] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [form, setForm] = React.useState<{
    documentType: IdentityDocumentType;
    name: string;
  }>({ documentType: "NATIONAL_ID", name: "" });
  const [pendingFile, setPendingFile] = React.useState<{
    dataUrl: string;
    size: number;
    mimeType: string;
    originalName: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingFile({
        dataUrl: reader.result as string,
        size: file.size,
        mimeType: file.type,
        originalName: file.name,
      });
      // Pre-fill name from file name
      if (!form.name) {
        setForm((f) => ({ ...f, name: file.name.replace(/\.[^/.]+$/, "") }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const submit = async () => {
    if (!pendingFile) return;
    setUploading(true);
    try {
      await onAdd({
        name: form.name || docTypeLabel(form.documentType),
        documentType: form.documentType,
        fileUrl: pendingFile.dataUrl,
        fileSize: pendingFile.size,
        mimeType: pendingFile.mimeType,
      });
      setAdding(false);
      setPendingFile(null);
      setForm({ documentType: "NATIONAL_ID", name: "" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm(t("acc.docs.confirmDelete"))) return;
    setDeleting(docId);
    try {
      await onDelete(docId);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t("acc.docs.title")}</div>
            <div className="text-xs text-ink-muted mt-0.5">
              {t("acc.docs.hint")}
            </div>
          </div>
          {!adding && (
            <Button size="sm" variant="secondary" onClick={() => setAdding(true)}>
              {t("acc.docs.add")}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {/* Add form */}
        {adding && (
          <div className="mb-4 p-4 rounded-lg border border-brand-200 bg-brand-50 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>{t("acc.docs.type")}</Label>
                <select
                  value={form.documentType}
                  onChange={(e) =>
                    setForm({ ...form, documentType: e.target.value as IdentityDocumentType })
                  }
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {DOC_TYPES.map((dt) => (
                    <option key={dt} value={dt}>
                      {DOC_ICONS[dt]} {docTypeLabel(dt)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label>{t("acc.docs.name")}</Label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={docTypeLabel(form.documentType)}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* File picker */}
            <div>
              <Label>{t("acc.docs.file")}</Label>
              <div
                className={`mt-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  pendingFile
                    ? "border-brand-400 bg-brand-50"
                    : "border-border hover:border-brand-300"
                }`}
                onClick={() => inputRef.current?.click()}
              >
                {pendingFile ? (
                  <div className="text-sm">
                    <span className="text-2xl">
                      {pendingFile.mimeType.startsWith("image/") ? "🖼️" : "📄"}
                    </span>
                    <p className="font-medium text-ink mt-1">{pendingFile.originalName}</p>
                    <p className="text-ink-muted text-xs">{formatBytes(pendingFile.size)}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setPendingFile(null); }}
                      className="text-xs text-red-500 underline mt-1"
                    >
                      {t("acc.docs.changeFile")}
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-ink-muted">
                    <span className="text-2xl">📎</span>
                    <p className="mt-1">{t("acc.docs.pickFile")}</p>
                    <p className="text-xs">{t("acc.docs.fileHint")}</p>
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={!pendingFile || uploading}
                onClick={submit}
              >
                {uploading ? t("acc.docs.uploading") : t("acc.docs.save")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setAdding(false);
                  setPendingFile(null);
                  setForm({ documentType: "NATIONAL_ID", name: "" });
                }}
              >
                {t("acc.docs.cancel")}
              </Button>
            </div>
          </div>
        )}

        {/* Document list */}
        {documents.length === 0 && !adding ? (
          <p className="text-sm text-ink-muted text-center py-4">
            {t("acc.docs.empty")}
          </p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-surface hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">
                    {DOC_ICONS[doc.documentType]}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{doc.name}</div>
                    <div className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
                      <span>{docTypeLabel(doc.documentType)}</span>
                      {doc.fileSize && <span>· {formatBytes(doc.fileSize)}</span>}
                      {doc.verifiedAt && (
                        <span className="text-emerald-600 font-medium">{t("acc.docs.verified")}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-600 hover:underline font-medium"
                  >
                    {t("acc.docs.view")}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(doc.id)}
                    disabled={deleting === doc.id}
                    className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                  >
                    {deleting === doc.id ? "…" : t("acc.docs.delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
