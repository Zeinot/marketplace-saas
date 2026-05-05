import { db } from "./src/lib/db";
import { plan, category } from "./src/lib/db/schema";
import { config } from "dotenv";

config({ path: ".env.local" });

async function seed() {
  console.log("Seeding database...");

  // Seed plans
  const existingPlans = await db.select().from(plan);
  if (existingPlans.length === 0) {
    await db.insert(plan).values([
      {
        name: "Free",
        slug: "free",
        description: "Perfect for getting started",
        features: ["1 launch per month", "Community access", "Basic profile"],
      },
      {
        name: "Pro",
        slug: "pro",
        description: "For serious SaaS builders",
        features: [
          "Unlimited launches",
          "Marketplace listings",
          "Direct messaging",
          "Analytics dashboard",
          "Featured placement",
          "Priority support",
        ],
      },
    ]);
    console.log("Plans seeded");
  }

  // Seed categories
  const existingCategories = await db.select().from(category);
  if (existingCategories.length === 0) {
    await db.insert(category).values([
      { name: "AI", slug: "ai", description: "Artificial Intelligence tools", color: "#8b5cf6" },
      { name: "Developer Tools", slug: "developer-tools", description: "Tools for developers", color: "#3b82f6" },
      { name: "Productivity", slug: "productivity", description: "Boost your productivity", color: "#10b981" },
      { name: "Marketing", slug: "marketing", description: "Marketing and growth tools", color: "#f59e0b" },
      { name: "Finance", slug: "finance", description: "Financial tools and services", color: "#ef4444" },
      { name: "SaaS", slug: "saas", description: "General SaaS products", color: "#6366f1" },
    ]);
    console.log("Categories seeded");
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
