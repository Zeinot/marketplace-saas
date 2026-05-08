import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { saveFile } from "@/lib/upload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_ENTITIES = ["launches", "avatars"] as const;
type ValidEntity = (typeof VALID_ENTITIES)[number];

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const entity = formData.get("entity") as string | null;
    const entityId = formData.get("entityId") as string | null;

    if (!file || !entity || !entityId) {
      return NextResponse.json(
        { error: "Missing required fields: file, entity, entityId" },
        { status: 400 }
      );
    }

    if (!VALID_ENTITIES.includes(entity as ValidEntity)) {
      return NextResponse.json(
        { error: `Invalid entity. Must be one of: ${VALID_ENTITIES.join(", ")}` },
        { status: 400 }
      );
    }

    if (entity === "avatars" && entityId !== session.user.id) {
      return NextResponse.json(
        { error: "Cannot upload avatar for another user" },
        { status: 403 }
      );
    }

    const result = await saveFile(file, entity, entityId);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
