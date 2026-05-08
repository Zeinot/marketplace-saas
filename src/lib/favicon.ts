const FAVICON_TIMEOUT = 5000;

interface FaviconResult {
  url: string | null;
  source: "google" | "direct" | null;
}

async function urlExists(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function resolveFavicon(websiteUrl: string | null): Promise<FaviconResult> {
  if (!websiteUrl) {
    return { url: null, source: null };
  }

  try {
    const url = new URL(websiteUrl);
    const domain = url.hostname;

    // Strategy 1: Google favicon service (most reliable)
    const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    return { url: googleUrl, source: "google" };

  } catch {
    return { url: null, source: null };
  }
}

export function getInitialsLogo(title: string): string {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
