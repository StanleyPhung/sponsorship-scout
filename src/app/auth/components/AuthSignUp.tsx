"use client";

import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthSignUp() {
  const router = useRouter();
  const { setEmail: setStoreEmail } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr(null);

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    // Use email prefix as a temporary placeholder — the real name is collected
    // during the onboarding conversation (awaiting-name stage).
    const tempName = email.split("@")[0];

    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: tempName,
      email,
      password,
      callbackURL: "/onboarding",
    });
    setBusy(false);

    if (error) {
      setErr(error.message ?? "Sign up failed");
      return;
    }

    setStoreEmail(email);
    router.push("/onboarding");
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
        placeholder="At least 6 characters"
      />

      {err && <div className="text-sm">{err}</div>}

      <button
        type="submit"
        disabled={busy}
        className="w-full py-2 rounded text-sm"
      >
        {busy ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}
