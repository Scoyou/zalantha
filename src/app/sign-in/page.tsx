"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";
import {
  authApiConfigSummary,
  requestPasswordReset,
  signInWithAuthApi,
  signUpWithAuthApi,
} from "@/lib/authApi";
import {
  clearStoredTokens,
  getLocalUser,
  setStoredTokens,
} from "@/lib/authSession";
import { cognitoConfigSummary, configureAmplify } from "@/lib/cognito";

function SignInContent() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mode, setMode] = useState<"sign-in" | "sign-up" | "reset">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const passwordRules = [
    {
      ok: /[A-Z]/.test(password),
      label: "Uppercase letter",
    },
    {
      ok: /[a-z]/.test(password),
      label: "Lowercase letter",
    },
    {
      ok: /\d/.test(password),
      label: "Number",
    },
    {
      ok: /[^A-Za-z0-9]/.test(password),
      label: "Special character",
    },
  ];

  const isConfigured = cognitoConfigSummary.missing.length === 0;
  const missingConfig = cognitoConfigSummary.missing;
  const isAuthApiConfigured = authApiConfigSummary.missing.length === 0;
  const missingAuthConfig = authApiConfigSummary.missing;

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "sign-up") {
      setMode("sign-up");
    }
    if (modeParam === "reset") {
      setMode("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    const localUser = getLocalUser();
    if (localUser) {
      setUserName(localUser.name ?? localUser.email ?? localUser.userId);
      setStatus("ready");
      return;
    }

    if (!isConfigured) {
      setStatus("ready");
      return;
    }

    configureAmplify();

    const load = async () => {
      setStatus("loading");
      setError(null);
      try {
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const rawDisplayName =
          session.tokens?.idToken?.payload?.name ??
          session.tokens?.idToken?.payload?.email ??
          currentUser.username;
        setUserName(String(rawDisplayName));
      } catch (caught) {
        if (
          caught instanceof Error &&
          !caught.message.toLowerCase().includes("authenticated")
        ) {
          setError(caught.message);
        }
        setUserName(null);
      } finally {
        setStatus("ready");
      }
    };

    load();
  }, [isConfigured]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAuthApiConfigured) {
      return;
    }

    setStatus("loading");
    setError(null);
    setNotice(null);

    try {
      const tokens = await signInWithAuthApi(email, password);
      setStoredTokens(tokens);
      const localUser = getLocalUser();
      setUserName(localUser?.name ?? localUser?.email ?? "Adventurer");
      setEmail("");
      setPassword("");
      setNotice("Signed in successfully.");
      router.push("/backend");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to sign in with the custom portal.",
      );
    } finally {
      setStatus("ready");
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAuthApiConfigured) {
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
      await signUpWithAuthApi(email, password, name);
      setNotice("Account created. Check your email to confirm.");
      setMode("sign-in");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to create your account.",
      );
    } finally {
      setStatus("ready");
    }
  };

  const handleRequestReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isAuthApiConfigured) {
      return;
    }

    if (!email.trim()) {
      setError("Enter your email to request a reset link.");
      return;
    }

    setStatus("loading");
    setError(null);
    setNotice(null);

    try {
      await requestPasswordReset(email.trim());
      setNotice("Reset link sent. Check your email.");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to request a reset code.",
      );
    } finally {
      setStatus("ready");
    }
  };

  const handleSignOut = async () => {
    clearStoredTokens();
    if (isConfigured) {
      await signOut();
    }
    setUserName(null);
  };

  return (
    <div className="relative overflow-hidden px-6 py-16 md:px-10">
      <Link
        href="/backend"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink/70 transition hover:text-ink md:left-10 md:top-8"
      >
        <span aria-hidden="true">←</span>
        Back
      </Link>
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-200/40 blur-[90px]" />
      <div className="pointer-events-none absolute right-10 top-10 h-72 w-72 rounded-full bg-rose-200/40 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[110px]" />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
        <div className="surface-panel surface-panel--deep w-full rounded-3xl p-6 md:p-8">
          <div className="space-y-5">
            <div>
              <h2 className="mt-3 text-2xl text-ink">
                {mode === "sign-in"
                  ? "Welcome back"
                  : mode === "sign-up"
                    ? "Join the guild"
                    : "Reset your password"}
              </h2>
            </div>

            {!isConfigured ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-sm text-rose-900">
                <p className="font-semibold">Cognito configuration needed</p>
                <p className="mt-2 text-rose-900/80">
                  Add the following environment values to enable login:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs uppercase tracking-[0.2em]">
                  {missingConfig.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!isAuthApiConfigured ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
                <p className="font-semibold">Custom auth API needed</p>
                <p className="mt-2 text-amber-900/80">
                  Add the following environment values to enable custom login:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-xs uppercase tracking-[0.2em]">
                  {missingAuthConfig.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

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

            {userName ? (
              <div className="rounded-2xl border border-ink/10 bg-parchment/70 p-4 text-sm">
                Signed in as <span className="font-semibold">{userName}</span>.
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/backend"
                    className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                  >
                    Continue to Archive
                  </Link>
                  <button
                    className="rounded-full border border-ink/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink/70 transition hover:border-ink/50"
                    type="button"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={
                  mode === "sign-in"
                    ? handleSignIn
                    : mode === "sign-up"
                      ? handleSignUp
                      : handleRequestReset
                }
              >
                {mode === "sign-up" ? (
                  <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                    Name
                    <input
                      className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seren Vale"
                      required
                    />
                  </label>
                ) : null}
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Email
                  <input
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@zalantha.org"
                    required
                  />
                </label>
                {mode !== "reset" ? (
                  <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                    Password
                    <input
                      className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    {mode === "sign-up" ? (
                      <div className="mt-3 space-y-1 text-[11px] uppercase tracking-[0.2em] text-ink/50">
                        {passwordRules.map((rule) => (
                          <div
                            key={rule.label}
                            className={
                              rule.ok ? "text-emerald-700" : "text-ink/50"
                            }
                          >
                            {rule.ok ? "[x]" : "[ ]"} {rule.label}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </label>
                ) : null}
                {mode === "sign-up" ? (
                  <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                    Confirm Password
                    <input
                      className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Re-enter your password"
                      required
                    />
                    <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      Uppercase, lowercase, number, special character
                    </span>
                  </label>
                ) : null}
                {mode === "reset" ? (
                  <button
                    className="btn-primary w-full text-[11px] uppercase tracking-[0.3em]"
                    type="submit"
                    disabled={status === "loading" || !isAuthApiConfigured}
                  >
                    {status === "loading"
                      ? "Sending..."
                      : "Email Reset Link"}
                  </button>
                ) : (
                  <button
                    className="btn-primary btn-primary--shimmer w-full text-[11px] uppercase tracking-[0.3em]"
                    type="submit"
                    disabled={status === "loading" || !isAuthApiConfigured}
                  >
                    {status === "loading"
                      ? "Opening Secure Portal..."
                      : mode === "sign-in"
                        ? "Sign In"
                        : "Create Account"}
                  </button>
                )}
              </form>
            )}

            <div className="flex flex-col gap-3 pt-1">
              <button
                className="text-xs uppercase tracking-[0.3em] text-ink/70 transition hover:text-ink"
                type="button"
                onClick={() => {
                  setMode((prev) =>
                    prev === "sign-in" ? "sign-up" : "sign-in",
                  );
                  setError(null);
                  setNotice(null);
                }}
                disabled={status === "loading"}
              >
                {mode === "sign-in"
                  ? "New to Zalantha? Create an account."
                  : "Already registered? Sign in instead."}
              </button>

              {mode !== "reset" ? (
                <button
                  className="text-xs uppercase tracking-[0.3em] text-ink/70 transition hover:text-ink"
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setError(null);
                    setNotice(null);
                  }}
                  disabled={status === "loading"}
                >
                  Forgot password?
                </button>
              ) : (
                <button
                  className="text-xs uppercase tracking-[0.3em] text-ink/70 transition hover:text-ink"
                  type="button"
                  onClick={() => {
                    setMode("sign-in");
                    setError(null);
                    setNotice(null);
                  }}
                  disabled={status === "loading"}
                >
                  Back to sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="px-6 py-16 md:px-10" />}>
      <SignInContent />
    </Suspense>
  );
}
