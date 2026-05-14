"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Input, Label } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { AvatarUploader } from "../../components/AvatarUploader";
import { IdentityDocuments } from "../../components/IdentityDocuments";
import type { UserDocument, IdentityDocumentType } from "@hwe/types";

export default function ProfilePage() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const [form, setForm] = React.useState({ firstName: "", lastName: "", phone: "" });
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [documents, setDocuments] = React.useState<UserDocument[]>([]);

  React.useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? "",
    });
    setAvatar(user.avatarUrl ?? null);
    api.listMyDocuments().then(setDocuments).catch(() => {});
  }, [user, loading, router]);

  if (!user) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await api.updateMe({ ...form, avatarUrl: avatar ?? undefined });
    await refresh();
    setSaving(false);
    setSaved(true);
  };

  const handleAddDocument = async (doc: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
  }) => {
    const created = await api.createMyDocument(doc);
    setDocuments((prev) => [created, ...prev]);
  };

  const handleDeleteDocument = async (docId: string) => {
    await api.deleteMyDocument(docId);
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  return (
    <section className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl">Mon profil</h1>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <div className="text-sm text-ink-muted">Connecté en tant que locataire / acheteur</div>
          <div className="font-medium">{user.email}</div>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="flex justify-center pb-2">
              <AvatarUploader
                value={avatar}
                onChange={setAvatar}
                firstName={form.firstName}
                lastName={form.lastName}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Prénom</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Nom</Label>
                <Input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Téléphone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Enregistrement…" : "Enregistrer"}
              </Button>
              {saved && <span className="text-sm text-success">Profil mis à jour ✓</span>}
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Identity documents */}
      <IdentityDocuments
        documents={documents}
        onAdd={handleAddDocument}
        onDelete={handleDeleteDocument}
      />
    </section>
  );
}
