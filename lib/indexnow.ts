import { getIndexableUrls } from "@/lib/indexableUrls";
import { SITE_URL } from "@/lib/site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function getIndexNowKey() {
  return process.env.INDEXNOW_KEY?.trim() || "";
}

export function getIndexNowHost() {
  return process.env.INDEXNOW_HOST?.trim() || new URL(SITE_URL).host;
}

export function getIndexNowKeyUrl() {
  const key = getIndexNowKey();

  if (!key) {
    return "";
  }

  return `${SITE_URL}/${key}.txt`;
}

export function isIndexNowConfigured() {
  return Boolean(getIndexNowKey());
}

export function getDefaultIndexNowUrls() {
  return getIndexableUrls();
}

export async function submitIndexNowUrls(urls: string[]) {
  const key = getIndexNowKey();

  if (!key) {
    throw new Error("INDEXNOW_KEY is not configured.");
  }

  const uniqueUrls = Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean)
    )
  );

  if (uniqueUrls.length === 0) {
    return {
      submitted: 0
    };
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      host: getIndexNowHost(),
      key,
      keyLocation: getIndexNowKeyUrl(),
      urlList: uniqueUrls
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`IndexNow request failed with ${response.status}.`);
  }

  return {
    submitted: uniqueUrls.length
  };
}
