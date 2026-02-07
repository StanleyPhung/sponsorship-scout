"use client";

import { fetchUserByUsername } from "@/lib/user-data";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CreativeDNA = {
  goals: string;
  archetype: string;
  personality: string;
  audience_tags: string[];
};

type Superpowers = {
  pathway: string;
  superpowers: Record<string, string>;
};

type GrowthZone = {
  low_performers: string;
  missed_potential: string;
};

type ProfileData = {
  username: string;
  creative_dna: CreativeDNA;
  superpowers: Superpowers;
  growth_zone: GrowthZone;
};

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const username = decodeURIComponent(params.username);
        const user = await fetchUserByUsername(username);
        const data = user.recommendation_json?.data ?? user.recommendation_json;
        setProfile(data as ProfileData);
      } catch (e: any) {
        console.error("Failed to load profile:", e);
        setError("Could not load profile data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.username]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold">Profile not found</p>
          <p className="text-sm text-muted-foreground">{error ?? "No data available"}</p>
        </div>
      </div>
    );
  }

  const { creative_dna, superpowers, growth_zone } = profile;

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6 pb-20">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{decodeURIComponent(params.username)}</h1>
        {creative_dna?.archetype && (
          <p className="text-lg text-muted-foreground">{creative_dna.archetype}</p>
        )}
        {creative_dna?.personality && (
          <p className="text-sm text-muted-foreground">{creative_dna.personality}</p>
        )}
      </header>

      {/* Audience Tags */}
      {creative_dna?.audience_tags && creative_dna.audience_tags.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Audience
          </h2>
          <div className="flex flex-wrap gap-2">
            {creative_dna.audience_tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Goals */}
      {creative_dna?.goals && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Goals
          </h2>
          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-sm leading-relaxed">{creative_dna.goals}</p>
          </div>
        </section>
      )}

      {/* Superpowers */}
      {superpowers && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Superpowers
          </h2>
          {superpowers.pathway && (
            <p className="text-xs text-muted-foreground">Pathway: {superpowers.pathway}</p>
          )}
          <div className="space-y-3">
            {Object.entries(superpowers.superpowers ?? {}).map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-amber-500/40 bg-amber-600/10 p-4 space-y-1"
              >
                <h3 className="text-sm font-semibold text-amber-500">{title}</h3>
                <p className="text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Growth Zones */}
      {growth_zone && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Growth Zones
          </h2>
          <div className="space-y-3">
            {growth_zone.low_performers && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-600/10 p-4 space-y-1">
                <h3 className="text-sm font-semibold text-emerald-500">Low Performers</h3>
                <p className="text-sm leading-relaxed">{growth_zone.low_performers}</p>
              </div>
            )}
            {growth_zone.missed_potential && (
              <div className="rounded-2xl border border-violet-500/40 bg-violet-600/10 p-4 space-y-1">
                <h3 className="text-sm font-semibold text-violet-500">Missed Potential</h3>
                <p className="text-sm leading-relaxed">{growth_zone.missed_potential}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
