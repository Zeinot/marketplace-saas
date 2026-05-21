const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redisClient: any | null = null;

async function getRedisClientInternal(): Promise<any | null> {
  if (redisClient) return redisClient;
  
  try {
    // Use require to avoid build-time resolution
    const Redis = require("ioredis");
    redisClient = new Redis(redisUrl, {
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    });

    redisClient.on("error", (err: Error) => {
      console.error("Redis connection error:", err.message);
    });

    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });

    return redisClient;
  } catch {
    console.warn("Redis not available, cache operations will be no-ops");
    return null;
  }
}

// Helper to revive ISO date strings back to Date objects after JSON.parse
function reviveDates<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") {
    // ISO 8601 pattern: YYYY-MM-DDTHH:mm:ss.sssZ or similar
    const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (isoPattern.test(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date as unknown as T;
      }
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(reviveDates) as unknown as T;
  }
  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = reviveDates(v);
    }
    return result as unknown as T;
  }
  return value;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClientInternal();
    if (!client) return null;
    const data = await client.get(key);
    if (!data) return null;
    const parsed = JSON.parse(data) as T;
    return reviveDates(parsed);
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds: number = 300
): Promise<void> {
  try {
    const client = await getRedisClientInternal();
    if (!client) return;
    await client.setex(key, ttlSeconds, JSON.stringify(value));
  } catch (error) {
    console.error("Cache set error:", error);
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    const client = await getRedisClientInternal();
    if (!client) return;
    await client.del(key);
  } catch (error) {
    console.error("Cache del error:", error);
  }
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  try {
    const client = await getRedisClientInternal();
    if (!client) return;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch (error) {
    console.error("Cache invalidate pattern error:", error);
  }
}

// Cache TTL configurations (in seconds)
export const CACHE_TTL = {
  LAUNCHES_LIST: 300,      // 5 minutes
  LAUNCH_DETAIL: 600,      // 10 minutes
  CATEGORIES: 1800,        // 30 minutes
  COMMENTS: 120,           // 2 minutes
  POSTS: 180,              // 3 minutes
  POST_COMMENTS: 120,      // 2 minutes
} as const;

// Cache key builders
export function buildLaunchesKey(
  filter: string,
  sort: string,
  categorySlug?: string,
  search?: string,
  mrr?: string,
  price?: string
): string {
  return `launches:${filter}:${sort}:${categorySlug || "all"}:${search || "all"}:${mrr || "all"}:${price || "all"}`;
}

export function buildLaunchKey(slug: string): string {
  return `launch:slug:${slug}`;
}

export function buildCategoriesKey(): string {
  return "categories:all";
}

export function buildLaunchCommentsKey(launchId: number): string {
  return `comments:launch:${launchId}`;
}

export function buildPostsKey(
  sort: string,
  type: string,
  search?: string
): string {
  return `posts:${sort}:${type}:${search || "all"}`;
}

export function buildPostCommentsKey(postId: number): string {
  return `comments:post:${postId}`;
}
