import { getIndexNowKey } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export function GET() {
  const configuredKey = getIndexNowKey();

  if (!configuredKey) {
    return new Response("Not found.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex"
      }
    });
  }

  return new Response(configuredKey, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex"
    }
  });
}
