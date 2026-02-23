"use client";

import { authClient } from "@/lib/auth-client";
import { fetchUserByEmail } from "@/lib/user-data";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthSignIn() {
  const router = useRouter();
  const { setEmail: setStoreEmail, setUsername: setStoreUsername } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr(null);

    if (!email || !password) {
      setErr("Please fill email and password.");
      return;
    }

    setBusy(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setBusy(false);
      setErr(error.message ?? "Sign in failed");
      return;
    }

    setBusy(false);

    // Query Supabase User table by email
    // If no row exists yet the user hasn't finished onboarding — send them there.
    try {
      const userData = await fetchUserByEmail(email);
      if (userData?.username) {
        setStoreEmail(email);
        setStoreUsername(userData.username);
        router.push(`/profile/${userData.username}`);
      } else {
        // Authenticated but no profile yet
        router.push("/onboarding");
      }
    } catch {
      // fetchUserByEmail throws when no row is found — treat as incomplete onboarding
      router.push("/onboarding");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-xs">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded text-sm"
        placeholder="you@example.com"
      />

      <label className="block text-xs">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded text-sm"
        placeholder="••••••••"
      />

      {err && <div className="text-sm text-red-600">{err}</div>}

      <button
        type="submit"
        disabled={busy}
        className="w-full py-2 rounded text-sm"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
