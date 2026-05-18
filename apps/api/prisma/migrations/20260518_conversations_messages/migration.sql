-- ============================================================================
-- Messagerie : Conversation + Message
-- ============================================================================

-- Conversation
CREATE TABLE IF NOT EXISTS "Conversation" (
  "id"            TEXT PRIMARY KEY,
  "propertyId"    TEXT NOT NULL,
  "inquiryId"     TEXT,
  "ownerId"       TEXT NOT NULL,
  "otherUserId"   TEXT NOT NULL,
  "lastMessageAt" TIMESTAMP(3),
  "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Conversation_propertyId_fkey"
    FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE,
  CONSTRAINT "Conversation_inquiryId_fkey"
    FOREIGN KEY ("inquiryId") REFERENCES "Inquiry"("id") ON DELETE SET NULL,
  CONSTRAINT "Conversation_ownerId_fkey"
    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "Conversation_otherUserId_fkey"
    FOREIGN KEY ("otherUserId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Conversation_inquiryId_key"
  ON "Conversation"("inquiryId") WHERE "inquiryId" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "Conversation_owner_other_property_key"
  ON "Conversation"("ownerId", "otherUserId", "propertyId");

CREATE INDEX IF NOT EXISTS "Conversation_owner_lastMessage_idx"
  ON "Conversation"("ownerId", "lastMessageAt" DESC);

CREATE INDEX IF NOT EXISTS "Conversation_other_lastMessage_idx"
  ON "Conversation"("otherUserId", "lastMessageAt" DESC);

-- Message
CREATE TABLE IF NOT EXISTS "Message" (
  "id"             TEXT PRIMARY KEY,
  "conversationId" TEXT NOT NULL,
  "senderId"       TEXT NOT NULL,
  "content"        TEXT NOT NULL,
  "readAt"         TIMESTAMP(3),
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Message_conversationId_fkey"
    FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE,
  CONSTRAINT "Message_senderId_fkey"
    FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Message_conversation_createdAt_idx"
  ON "Message"("conversationId", "createdAt");
CREATE INDEX IF NOT EXISTS "Message_senderId_idx" ON "Message"("senderId");
