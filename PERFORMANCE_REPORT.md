# Cache Performance Report

**Generated:** 2026-05-10T17:35:05.752Z

## Overview

This report compares database query performance **with** and **without** Redis distributed caching.

### Architecture
- **Cache Type:** Redis (in-memory key-value store)
- **Pattern:** Cache-Aside (Lazy Loading)
- **Invalidation:** Write-through invalidation on data mutations
- **TTL:** Configured per operation type (2-30 minutes)



## Results

| Operation | Without Cache (ms) | With Cache - Cold (ms) | With Cache - Warm (ms) | Improvement |
|-----------|-------------------|----------------------|----------------------|-------------|
| Get Launches List | 9.17 | 2.26 | 0.05 | 99.4% |
| Get Categories | 1.69 | 2.55 | 0.07 | 95.6% |
| Get Launch Detail | 0 | 0 | 0 | N/A |
| Get Posts List | 1.88 | 1.5 | 0.06 | 97.0% |

### Key Findings

- **Get Launches List:** Response time reduced from 9.17ms to 0.05ms (99.4% improvement with warm cache)
- **Get Categories:** Response time reduced from 1.69ms to 0.07ms (95.6% improvement with warm cache)
- **Get Launch Detail:** Response time reduced from 0ms to 0ms (N/A improvement with warm cache)
- **Get Posts List:** Response time reduced from 1.88ms to 0.06ms (97.0% improvement with warm cache)

### Cache Hit Rate Impact

- **Cold Cache:** First request populates the cache (DB query + serialization + network overhead)
- **Warm Cache:** Subsequent requests served directly from Redis memory (~sub-millisecond latency)
- **Write Operations:** Automatically invalidate affected cache keys to ensure data consistency

### Operations Cached

1. **Get Launches List** - TTL: 5 minutes
   - Key pattern: `launches:{filter}:{sort}:{category}:{search}:{mrr}:{price}`
   - Invalidated on: launch creation, upvote, comment

2. **Get Categories** - TTL: 30 minutes
   - Key pattern: `categories:all`
   - Invalidated on: category changes (rare)

3. **Get Launch Detail** - TTL: 10 minutes
   - Key pattern: `launch:slug:{slug}`
   - Invalidated on: upvote, comment, edit

4. **Get Posts List** - TTL: 3 minutes
   - Key pattern: `posts:{sort}:{type}:{search}`
   - Invalidated on: new post, upvote, comment

## Conclusion

The distributed cache significantly improves read performance by:
- Eliminating repeated database queries for frequently accessed data
- Reducing database load and connection pool pressure
- Providing sub-millisecond response times for cached data
- Maintaining data consistency through strategic invalidation

## Deliverables

- `docker-compose.yml` - Updated with Redis service
- `src/lib/cache.ts` - Cache abstraction layer
- `src/lib/actions/launch.ts` - Modified with cache integration
- `src/lib/actions/post.ts` - Modified with cache integration
- `PERFORMANCE_REPORT.md` - This report
