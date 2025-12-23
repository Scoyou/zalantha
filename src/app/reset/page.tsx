"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "@/lib/authApi";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") ?? "";

  const passwordRules = [
    { ok: /[A-Z]/.test(password), label: "Uppercase letter" },
    { ok: /[a-z]/.test(password), label: "Lowercase letter" },
    { ok: /\d/.test(password), label: "Number" },
    { ok: /[^A-Za-z0-9]/.test(password), label: "Special character" },
  ];

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setError("Missing reset token.");
      return;
    }

    const firstFailed = passwordRules.find((check) => !check.ok);
    if (firstFailed) {
      setError(`Password must include a ${firstFailed.label.toLowerCase()}.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("loading");
    setError(null);
    setNotice(null);

    try {
      await confirmPasswordReset(token, password);
      setNotice("Password reset. Redirecting to sign in...");
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Unable to reset password.",
      );
    } finally {
      setStatus("ready");
    }
  };

  return (
    <div className="relative overflow-hidden px-6 py-16 md:px-10">
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-200/40 blur-[90px]" />
      <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-rose-200/40 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[110px]" />

      <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/70">
            Knights of Zalantha
          </p>
          <h1 className="text-4xl text-ink md:text-5xl">
            Restore your passage
          </h1>
          <p className="text-base text-ink/80 md:text-lg">
            Set a new password to return to the Adventurer Archive.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-in"
              className="rounded-full border border-ink/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink/70 transition hover:border-ink/50"
            >
              Back to Sign In
            </Link>
          </div>
        </div>

        <div className="surface-panel surface-panel--deep rounded-3xl p-6 md:p-8">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/70">
                Reset Password
              </p>
              <h2 className="mt-3 text-2xl text-ink">Choose a new key</h2>
              <p className="mt-2 text-sm text-ink/75">
                The reset link is valid for a limited time.
              </p>
            </div>

            {error ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
                {error}
              </div>
            ) : null}
            {notice ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-900">
                {notice}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleReset}>
              <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                New Password
                <input
                  className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter a new password"
                  required
                />
                <div className="mt-3 space-y-1 text-[11px] uppercase tracking-[0.2em] text-ink/50">
                  {passwordRules.map((rule) => (
                    <div
                      key={rule.label}
                      className={rule.ok ? "text-emerald-700" : "text-ink/50"}
                    >
                      {rule.ok ? "[x]" : "[ ]"} {rule.label}
                    </div>
                  ))}
                </div>
              </label>
              <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                Confirm Password
                <input
                  className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter the new password"
                  required
                />
              </label>
              <button
                className="btn-primary btn-primary--shimmer w-full text-[11px] uppercase tracking-[0.3em]"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
