"use client";

import * as React from "react";
import { useShellParams } from "../../../../lib/route-params";
import { loadProperty } from "../../../../lib/nav";
import {
  Button,
  Input,
  Label,
  Select,
  Textarea,
  ErrorState,
  EmptyState,
  isNotFound,
  toast,
  fmtDate,
  fmtBytes,
  openDataUrl,
  readFileAsDataUrl,
  DOC_ACCEPT,
  DOC_MIME_TYPES,
  MAX_DOC_BYTES,
  tUi,
  Icon,
  IconBadge,
  type IconName,
} from "@hwe/ui";
import { api } from "../../../../lib/api";
import { useAuth } from "../../../../lib/auth-context";
import { Modal } from "../../../../components/Modal";
import type { Property, PropertyDocument, DocumentType } from "@hwe/types";
import { DOCUMENT_TYPE_LABELS } from "@hwe/types";
import { t } from "../../../../lib/i18n";

const DOCTYPE_VALUES = Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[];

const docTypeLabel = (code: DocumentType) => t("acc.propDocType." + code);

const FILE_ICONS: Record<string, IconName> = {
  "application/pdf": "file",
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
};

type PendingFile = { dataUrl: string; size: number; mimeType: string; originalName: string };

/**
 * Documents légaux du bien (F1) : le fichier est TÉLÉVERSÉ (data-URL validée
 * côté API, contrat §7) — plus de champ « URL ». Ouverture via Blob (S1/S3).
 */
export default function DocumentsPage() {
  const { user } = useAuth();
  const params = useShellParams<{ id: string }>("/dashboard/:id/documents");

  const [property, setProperty] = React.useState<Property | null>(null);
  const [docs, setDocs] = React.useState<PropertyDocument[]>([]);
  const [working, setWorking] = React.useState(true);
  const [loadError, setLoadError] = React.useState<unknown>(null);
  const [tick, setTick] = React.useState(0);
  const [showForm, setShowForm] = React.useState(false);
  const [editDoc, setEditDoc] = React.useState<PropertyDocument | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Formulaire
  const [name, setName] = React.useState("");
  const [docType, setDocType] = React.useState<DocumentType>("OTHER");
  const [file, setFile] = React.useState<PendingFile | null>(null);
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (!params?.id || !user) return;
    let cancelled = false;
    setWorking(true);
    setLoadError(null);
    Promise.all([loadProperty(params.id), api.listDocuments(params.id)])
      .then(([prop, documents]) => {
        if (cancelled) return;
        setProperty(prop);
        setDocs(documents);
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e);
      })
      .finally(() => {
        if (!cancelled) setWorking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params?.id, user, tick]);

  const openAdd = () => {
    setEditDoc(null);
    setName("");
    setDocType("OTHER");
    setFile(null);
    setNotes("");
    setShowForm(true);
  };

  const openEdit = (doc: PropertyDocument) => {
    setEditDoc(doc);
    setName(doc.name);
    setDocType(doc.documentType);
    setFile(null);
    setNotes(doc.notes ?? "");
    setShowForm(true);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!(DOC_MIME_TYPES as readonly string[]).includes(f.type)) {
      toast.error(tUi("ui.err.fileType"));
      return;
    }
    if (f.size > MAX_DOC_BYTES) {
      toast.error(tUi("ui.err.fileTooBig", { max: fmtBytes(MAX_DOC_BYTES) }));
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(f);
      setFile({ dataUrl, size: f.size, mimeType: f.type, originalName: f.name });
      if (!name.trim()) setName(f.name.replace(/\.[^/.]+$/, ""));
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    if (!editDoc && !file) {
      toast.error(t("docs.fileRequired"));
      return;
    }
    setSubmitting(true);
    try {
      if (editDoc) {
        const updated = await api.updateDocument(params.id, editDoc.id, { name, notes });
        setDocs((d) => d.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)));
        toast.success(t("docs.updated"));
      } else if (file) {
        const created = await api.createDocument(params.id, {
          name: name.trim(),
          documentType: docType,
          fileUrl: file.dataUrl,
          fileSize: file.size,
          mimeType: file.mimeType,
          notes: notes.trim() || undefined,
        });
        setDocs((d) => [created, ...d]);
        toast.success(t("docs.added"));
      }
      setShowForm(false);
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm(t("acc.confirmDeleteDoc")) || !params?.id) return;
    try {
      await api.deleteDocument(params.id, docId);
      setDocs((d) => d.filter((x) => x.id !== docId));
      toast.success(t("docs.deleted"));
    } catch (err) {
      toast.error(err);
    }
  };

  const view = (doc: PropertyDocument) => {
    if (!openDataUrl(doc.fileUrl, doc.name)) toast.error(tUi("ui.err.openDoc"));
  };

  if (loadError) {
    return isNotFound(loadError) ? (
      <EmptyState title={t("pf.notFound")} />
    ) : (
      <ErrorState error={loadError} title={t("docs.loadError")} onRetry={() => setTick((n) => n + 1)} />
    );
  }

  if (working) {
    return <p className="text-ink-muted">{t("acc.loading")}</p>;
  }

  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="font-display text-3xl mb-1">{t("acc.docs.title")}</h1>
          <p className="text-ink-muted [overflow-wrap:anywhere]">
            {property?.title} — {property?.addressLine}, {property?.city}
          </p>
        </div>
        <Button onClick={openAdd}>{t("acc.docs.add")}</Button>
      </div>

      {showForm && (
        <Modal
          title={editDoc ? t("acc.docs.editTitle") : t("acc.docs.addTitle")}
          onClose={() => setShowForm(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {!editDoc && (
              <div>
                <span className="text-sm font-medium text-ink">{t("docs.fileLabel")}</span>
                <label
                  htmlFor="doc-file"
                  className={`mt-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-brand-500 ${
                    file ? "border-brand-400 bg-brand-50 dark:bg-brand-900/30" : "border-border hover:border-brand-300"
                  }`}
                >
                  <input id="doc-file" type="file" accept={DOC_ACCEPT} className="sr-only" onChange={onFile} />
                  <Icon name={file ? FILE_ICONS[file.mimeType] ?? "paperclip" : "paperclip"} size={24} className="text-brand-600 dark:text-brand-300" />
                  {file ? (
                    <>
                      <span className="text-sm font-medium text-ink [overflow-wrap:anywhere]">{file.originalName}</span>
                      <span className="text-xs text-ink-muted">{fmtBytes(file.size)}</span>
                      <span className="text-xs underline text-brand-700 dark:text-brand-300">{t("docs.change")}</span>
                    </>
                  ) : (
                    <span className="text-sm text-ink">{t("docs.choose")}</span>
                  )}
                </label>
                <p className="text-xs text-ink-muted mt-1">{t("docs.fileHint")}</p>
              </div>
            )}

            <div>
              <Label htmlFor="doc-name">{t("acc.docs.nameLabel")}</Label>
              <Input
                id="doc-name"
                value={name}
                maxLength={200}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("acc.docs.namePh")}
                required
              />
            </div>

            {!editDoc && (
              <div>
                <Label htmlFor="doc-type">{t("acc.docs.typeLabel")}</Label>
                <Select
                  id="doc-type"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as DocumentType)}
                  required
                >
                  {DOCTYPE_VALUES.map((code) => (
                    <option key={code} value={code}>
                      {docTypeLabel(code)}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="doc-notes">{t("acc.docs.notesLabel")}</Label>
              <Textarea
                id="doc-notes"
                value={notes}
                maxLength={2000}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("acc.docs.notesPh")}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? t("acc.saving") : editDoc ? t("acc.docs.update") : t("acc.docs.addBtn")}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                {t("acc.cancel")}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {docs.length === 0 ? (
        <EmptyState
          illustration="document"
          title={t("acc.docs.emptyTitle")}
          description={t("acc.docs.emptySub")}
          action={<Button onClick={openAdd}>{t("acc.docs.add")}</Button>}
        />
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => {
            const icon = FILE_ICONS[doc.mimeType ?? ""] ?? "paperclip";
            return (
              <li
                key={doc.id}
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border bg-surface hover:shadow-sm transition-shadow"
              >
                <IconBadge name={icon} />
                {/* min-w : sur téléphone les actions passent à la ligne au lieu d'écraser le nom. */}
                <div className="flex-1 min-w-[12rem]">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="font-medium truncate min-w-0 max-w-full">{doc.name}</span>
                    <span className="text-xs bg-sand-100 dark:bg-white/10 text-ink-muted px-2 py-0.5 rounded-full shrink-0">
                      {docTypeLabel(doc.documentType)}
                    </span>
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5 flex items-center gap-2 flex-wrap min-w-0">
                    <span>
                      {t("acc.docs.addedOn")} {fmtDate(doc.createdAt, "medium", { utc: false })}
                    </span>
                    {doc.fileSize ? <span>· {fmtBytes(doc.fileSize)}</span> : null}
                    {doc.notes && <span className="truncate max-w-full sm:max-w-xs min-w-0">· {doc.notes}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => view(doc)} aria-label={t("docs.view", { name: doc.name })}>
                    {t("acc.view")}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(doc)} aria-label={t("docs.edit", { name: doc.name })}>
                    <Icon name="pencil" size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                    aria-label={t("docs.delete", { name: doc.name })}
                  >
                    <Icon name="trash" size={16} />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </section>
  );
}
