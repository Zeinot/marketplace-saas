import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(redisUrl, {
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    });

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err.message);
    });

    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });
  }

  return redisClient;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient();
    const data = await client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
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
    const client = getRedisClient();
    await client.setex(key, ttlSeconds, JSON.stringify(value));
  } catch (error) {
    console.error("Cache set error:", error);
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    const client = getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error("Cache del error:", error);
  }
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  try {
    const client = getRedisClient();
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
