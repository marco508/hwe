"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Label, Select, Textarea } from "@hwe/ui";
import { useAuth } from "../../../../lib/auth-context";
import { api } from "../../../../lib/api";
import type { Property, PropertyDocument, DocumentType } from "@hwe/types";
import { DOCUMENT_TYPE_LABELS } from "@hwe/types";

const DOCTYPE_OPTIONS: { value: DocumentType; label: string }[] = (
  Object.entries(DOCUMENT_TYPE_LABELS) as [DocumentType, string][]
).map(([value, label]) => ({ value, label }));

const FILE_ICONS: Record<string, string> = {
  "application/pdf": "📄",
  "image/jpeg": "🖼️",
  "image/png": "🖼️",
  "application/msword": "📝",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "📝",
};

function formatBytes(bytes?: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DocumentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [property, setProperty] = React.useState<Property | null>(null);
  const [docs, setDocs] = React.useState<PropertyDocument[]>([]);
  const [working, setWorking] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editDoc, setEditDoc] = React.useState<PropertyDocument | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Form state
  const [name, setName] = React.useState("");
  const [docType, setDocType] = React.useState<DocumentType>("OTHER");
  const [fileUrl, setFileUrl] = React.useState("");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => {
    if (!params?.id) return;
    Promise.all([
      api.getProperty(params.id),
      api.listDocuments(params.id),
    ]).then(([prop, documents]) => {
      setProperty(prop);
      setDocs(documents);
      setWorking(false);
    });
  }, [params?.id]);

  const openAdd = () => {
    setEditDoc(null);
    setName("");
    setDocType("OTHER");
    setFileUrl("");
    setNotes("");
    setShowForm(true);
  };

  const openEdit = (doc: PropertyDocument) => {
    setEditDoc(doc);
    setName(doc.name);
    setDocType(doc.documentType);
    setFileUrl(doc.fileUrl);
    setNotes(doc.notes ?? "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    setSubmitting(true);
    try {
      if (editDoc) {
        const updated = await api.updateDocument(params.id, editDoc.id, {
          name,
          notes,
        });
        setDocs((d) => d.map((x) => (x.id === updated.id ? updated : x)));
      } else {
        const created = await api.createDocument(params.id, {
          name,
          documentType: docType,
          fileUrl,
          notes: notes || undefined,
        });
        setDocs((d) => [created, ...d]);
      }
      setShowForm(false);
    } catch (err) {
      alert("Erreur : " + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Supprimer ce document ?") || !params?.id) return;
    await api.deleteDocument(params.id, docId);
    setDocs((d) => d.filter((x) => x.id !== docId));
  };

  if (loading || working) {
    return <p className="text-ink-muted">Chargement…</p>;
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-2">
        <Link
          href={`/dashboard/${params?.id}/edit`}
          className="text-sm text-ink-muted hover:underline"
        >
          ← Retour au bien
        </Link>
      </div>
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl mb-1">Documents légaux</h1>
          <p className="text-ink-muted">
            {property?.title} — {property?.addressLine}, {property?.city}
          </p>
        </div>
        <Button onClick={openAdd}>+ Ajouter un document</Button>
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h2 className="font-display text-xl mb-6">
              {editDoc ? "Modifier le document" : "Ajouter un document"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="doc-name">Nom du document *</Label>
                <Input
                  id="doc-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex : Acte notarié 2020"
                  required
                />
              </div>

              {!editDoc && (
                <div>
                  <Label htmlFor="doc-type">Type de document *</Label>
                  <Select
                    id="doc-type"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocumentType)}
                    required
                  >
                    {DOCTYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {!editDoc && (
                <div>
                  <Label htmlFor="doc-url">URL du fichier *</Label>
                  <Input
                    id="doc-url"
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://storage.exemple.com/fichier.pdf"
                    required
                  />
                  <p className="text-xs text-ink-muted mt-1">
                    Copiez l'URL après avoir déposé votre fichier sur votre
                    service de stockage (Drive, Dropbox, S3…).
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="doc-notes">Notes (optionnel)</Label>
                <Textarea
                  id="doc-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Remarques, date d'expiration, références…"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? "Enregistrement…" : editDoc ? "Mettre à jour" : "Ajouter"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document list */}
      {docs.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-ink-subtle rounded-2xl">
          <div className="text-5xl mb-4">🗂️</div>
          <p className="font-semibold text-lg mb-1">Aucun document enregistré</p>
          <p className="text-ink-muted text-sm mb-6">
            Centralisez tous les documents officiels de ce bien en un seul endroit.
          </p>
          <Button onClick={openAdd}>+ Ajouter un document</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {docs.map((doc) => {
            const icon = FILE_ICONS[doc.mimeType ?? ""] ?? "📎";
            return (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-ink-subtle bg-white hover:shadow-sm transition-shadow"
              >
                <span className="text-3xl shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{doc.name}</span>
                    <span className="text-xs bg-sand-100 text-ink-muted px-2 py-0.5 rounded-full shrink-0">
                      {DOCUMENT_TYPE_LABELS[doc.documentType]}
                    </span>
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5 flex items-center gap-2">
                    <span>Ajouté le {formatDate(doc.createdAt)}</span>
                    {doc.fileSize && <span>· {formatBytes(doc.fileSize)}</span>}
                    {doc.notes && (
                      <span className="truncate max-w-xs">· {doc.notes}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm">
                      Voir
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(doc)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    🗑
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick nav */}
      <div className="mt-10 pt-6 border-t border-ink-subtle flex gap-4 flex-wrap">
        <Link href={`/dashboard/${params?.id}/lease`}>
          <Button variant="secondary">📋 Gérer les contrats de location</Button>
        </Link>
        <Link href={`/dashboard/${params?.id}/edit`}>
          <Button variant="ghost">Retour au bien</Button>
        </Link>
      </div>
    </section>
  );
}
