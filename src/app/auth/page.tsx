"use client";

import AuthToggleButtons from "@/components/AuthToggleButtons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { fetchUserByEmail } from "@/lib/user-data";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthSignIn from "./components/AuthSignIn";
import AuthSignUp from "./components/AuthSignUp";

export default function AuthPage() {
  const router = useRouter();
  const { setEmail: setStoreEmail, setUsername: setStoreUsername } = useUserStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [oauthBusy, setOauthBusy] = useState(false);

  // Check if user just signed in via OAuth and redirect to their profile
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user?.email) {
        try {
          const userData = await fetchUserByEmail(session.data.user.email);
          if (userData.username) {
            setStoreEmail(session.data.user.email);
            setStoreUsername(userData.username);
            router.push(`/profile/${userData.username}`);
          }
        } catch (err) {
          console.error("Failed to fetch user from Supabase after OAuth:", err);
        }
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  const continueWithGoogle = async () => {
    setOauthBusy(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth",
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className=" rounded-xl shadow p-6">
          <ThemeToggle/>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h2>
            <AuthToggleButtons mode={mode} onChange={(m) => setMode(m)} />
          </div>

          <div className="mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full !border-[#e84133] !text-[#e84133]"
              onClick={continueWithGoogle}
              disabled={oauthBusy}
            >
              <Image
                src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto"
                alt="Google Icon"
                className="size-5"
                width={20}
                height={20}
              />
              <span className="flex flex-1 justify-center">
                {oauthBusy ? "Redirecting..." : "Continue with Google"}
              </span>
            </Button>

            <div className="mt-2 text-xs text-gray-500 text-center">
              New here? Google will create your account automatically.
            </div>
          </div>

          <div>
            {mode === "signin" ? <AuthSignIn /> : <AuthSignUp />}
          </div>
        </div>
      </div>
    </main>
  );
}
