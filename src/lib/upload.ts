import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export interface UploadResult {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
}

function getSafeExtension(filename: string, mimeType: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeToExt: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };
  const safeExt = mimeToExt[mimeType];
  return safeExt || ext || ".bin";
}

export async function saveFile(
  file: File,
  entity: string,
  entityId: string
): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 5MB)`
    );
  }

  if (file.size === 0) {
    throw new Error("File is empty");
  }

  const safeEntity = path.basename(entity);
  const safeEntityId = path.basename(entityId);

  const dir = path.join(UPLOAD_DIR, safeEntity, safeEntityId);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const ext = getSafeExtension(file.name, file.type);
  const filename = `${randomUUID()}${ext}`;
  const filepath = path.join(dir, filename);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filepath, buffer);

  const url = `/uploads/${safeEntity}/${safeEntityId}/${filename}`;

  return {
    url,
    filename,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
  };
}

export async function deleteFile(url: string): Promise<void> {
  if (!url.startsWith("/uploads/")) {
    throw new Error("Invalid file URL");
  }

  const relativePath = url.replace("/uploads/", "");
  const filepath = path.join(UPLOAD_DIR, relativePath);

  const resolvedPath = path.resolve(filepath);
  const resolvedUploadDir = path.resolve(UPLOAD_DIR);

  if (!resolvedPath.startsWith(resolvedUploadDir)) {
    throw new Error("Path traversal detected");
  }

  if (existsSync(resolvedPath)) {
    await unlink(resolvedPath);
  }
}
