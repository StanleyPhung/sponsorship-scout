import { createGenerateSession } from "@/lib/generate-api";
import { GenerateWebSocket } from "@/lib/generate-websocket";
import type { IdeaData } from "../components/Card";

type VideoIdea = {
  title: string;
  hook: string;
  tags?: string[];
  script_outline: string;
  estimated_length?: string;
};

function stripQuotes(s: string): string {
  return s.trim().replace(/^"|"$/g, "").trim();
}

function extractBeats(scriptOutline: string): string[] {
  const beats: string[] = [];
  const lines = scriptOutline.split("\n").map((l) => l.trim());

  // Prefer time-beat lines like: **0:00-0:03 - The Hook**
  for (const line of lines) {
    const m = line.match(/^\*\*([^*]{3,80})\*\*/);
    if (m?.[1]) {
      const label = m[1].trim();
      if (label && !beats.includes(label)) beats.push(label);
      if (beats.length >= 3) return beats;
    }
  }

  // Next: headings (## / ###)
  for (const line of lines) {
    if (line.startsWith("## ") || line.startsWith("### ")) {
      const label = line.replace(/^#{2,3}\s+/, "").replace(/\*\*/g, "").trim();
      if (label && !beats.includes(label)) beats.push(label);
      if (beats.length >= 3) return beats;
    }
  }

  return ["Hook", "Build", "Payoff"];
}

function findIdeaInState(state: any): VideoIdea | null {
  const seen = new Set<any>();

  function dfs(x: any): VideoIdea | null {
    if (!x || typeof x !== "object") return null;
    if (seen.has(x)) return null;
    seen.add(x);

    if (
      typeof x.title === "string" &&
      typeof x.hook === "string" &&
      typeof x.script_outline === "string"
    ) {
      return x as VideoIdea;
    }

    for (const v of Object.values(x)) {
      const found = dfs(v);
      if (found) return found;
    }
    return null;
  }

  return dfs(state);
}

export async function generateNextCard(params: {
  user_profile: string;
  macro_themes: string[];
  user_prompt?: string;
  nextId: number;
}): Promise<IdeaData> {
  console.log("[generateNextCard] Creating session with params:", {
    macro_themes: params.macro_themes,
    user_prompt: params.user_prompt,
    nextId: params.nextId,
    user_profile_length: params.user_profile?.length,
  });

  const { session_id } = await createGenerateSession({
    user_profile: params.user_profile,
    macro_themes: params.macro_themes,
    user_prompt: params.user_prompt,
  });

  console.log("[generateNextCard] Session created:", session_id);

  return await new Promise<IdeaData>((resolve, reject) => {
    let structuredIdea: VideoIdea | null = null;

    const ws = new GenerateWebSocket({
      sessionId: session_id,

      onNodeComplete: (node, state) => {
        console.log("[generateNextCard] Node complete:", node, "state keys:", Object.keys(state ?? {}));
        if (node === "generate_structured") {
          // primary: state.generated_idea
          const direct = state?.generated_idea;
          console.log("[generateNextCard] generate_structured — direct generated_idea:", direct);
          structuredIdea =
            (direct && typeof direct === "object" ? (direct as VideoIdea) : null) ??
            findIdeaInState(state);
          console.log("[generateNextCard] structuredIdea resolved:", structuredIdea);
        }
      },

      onComplete: () => {
        console.log("[generateNextCard] onComplete — structuredIdea:", structuredIdea);
        if (!structuredIdea) {
          ws.disconnect();
          reject(new Error("Generation finished but generated_idea was not found."));
          return;
        }

        const beats = extractBeats(structuredIdea.script_outline);
        console.log("[generateNextCard] Extracted beats:", beats);

        const card: IdeaData = {
          id: params.nextId,
          title: structuredIdea.title.trim() || "Generated Idea",
          hook: stripQuotes(structuredIdea.hook) || "—",
          beats,
          rationale: `Generated from themes: ${params.macro_themes.join(", ")}`,
          contentMd: structuredIdea.script_outline,
          tags: Array.isArray(structuredIdea.tags) ? structuredIdea.tags : [],
          estimatedLength: structuredIdea.estimated_length,
          status: "shown",
        };

        console.log("[generateNextCard] Card built:", card);
        ws.disconnect();
        resolve(card);
      },

      onError: (msg) => {
        console.error("[generateNextCard] WebSocket error:", msg);
        ws.disconnect();
        reject(new Error(msg));
      },
    });

    console.log("[generateNextCard] Connecting WebSocket…");
    ws.connect();

    const startInterval = setInterval(() => {
      if (ws.isConnected()) {
        clearInterval(startInterval);
        console.log("[generateNextCard] WebSocket connected, sending start…");
        ws.start();
      }
    }, 50);
  });
}
