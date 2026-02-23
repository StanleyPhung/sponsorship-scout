import { type NextRequest, NextResponse } from "next/server";

const backendUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL_PROD
    : process.env.BACKEND_URL_DEV || "http://localhost:8000";

async function proxy(req: NextRequest, params: Promise<{ path: string[] }>) {
  if (!backendUrl) {
    return NextResponse.json({ error: "Backend URL not configured" }, { status: 503 });
  }

  const { path: segments } = await params;
  const path = segments.join("/");
  const search = req.nextUrl.search ?? "";
  const targetUrl = `${backendUrl}/api/v1/${path}${search}`;

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") return;
    headers.set(key, value);
  });

  let response: Response;
  try {
    response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: body ? Buffer.from(body) : undefined,
      // @ts-expect-error — Node 18+ fetch supports duplex
      duplex: "half",
    });
  } catch (e: any) {
    console.error("[proxy] fetch error →", targetUrl, e?.message);
    return NextResponse.json(
      { error: "Failed to reach backend", detail: e?.message },
      { status: 502 }
    );
  }

  const resHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (["transfer-encoding", "connection", "keep-alive"].includes(key.toLowerCase())) return;
    resHeaders.set(key, value);
  });

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: resHeaders,
  });
}

export const GET    = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => proxy(req, ctx.params);
export const POST   = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => proxy(req, ctx.params);
export const PUT    = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => proxy(req, ctx.params);
export const PATCH  = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => proxy(req, ctx.params);
export const DELETE = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => proxy(req, ctx.params);
