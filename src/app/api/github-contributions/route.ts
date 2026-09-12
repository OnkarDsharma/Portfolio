import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function extractContributionData(html: string) {
  const totalMatch = html.match(/(\d[\d,]*)\s+contributions?\s+in the last year/i);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

  const cells = [...html.matchAll(/data-date="([^"]+)"[^>]*data-level="(\d+)"/g)].map(([, date, level]) => ({
    date,
    level: Number(level),
  }));

  return { total, cells };
}

export async function GET() {
  const response = await fetch("https://github.com/users/OnkarDsharma/contributions", {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 502 });
  }

  const html = await response.text();
  const data = extractContributionData(html);

  return NextResponse.json(data);
}
