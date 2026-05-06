import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, profile } from "@/lib/db/schema";


export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  try {
    const email = `dev-${Date.now()}@example.com`;
    const password = "devpassword123";
    const name = "Dev User";

    // Check if user already exists
    const existing = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        email,
        password,
        message: "User already exists",
      });
    }

    // Create user via better-auth API
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result?.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Create profile for the user
    await db.insert(profile).values({
      id: result.user.id,
      displayName: name,
    });

    return NextResponse.json({
      success: true,
      email,
      password,
      userId: result.user.id,
    });
  } catch (error) {
    console.error("Seed user error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
