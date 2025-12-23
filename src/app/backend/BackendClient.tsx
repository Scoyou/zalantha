"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import { cognitoConfigSummary, configureAmplify } from "@/lib/cognito";

type Character = {
  id: string;
  name: string;
  lineage: string;
  calling: string;
  level: number;
  faction: string;
  lastPlayed: string;
  summary: string;
};

const defaultCharacters: Character[] = [
  {
    id: "warden-001",
    name: "Seren Vale",
    lineage: "Highlander",
    calling: "Warden",
    level: 7,
    faction: "The Silver Bastion",
    lastPlayed: "2025-01-12",
    summary: "A steadfast shield-bearer who vows to guard the eastern caravans.",
  },
  {
    id: "scribe-019",
    name: "Mira Thorn",
    lineage: "Lowland",
    calling: "Scribe",
    level: 5,
    faction: "The Ember Court",
    lastPlayed: "2024-12-18",
    summary: "Keeps the chronicles of the last four campaign arcs.",
  },
  {
    id: "ranger-044",
    name: "Kael Ashford",
    lineage: "Wilder",
    calling: "Ranger",
    level: 6,
    faction: "Pinewatch Rangers",
    lastPlayed: "2024-11-30",
    summary: "Scout captain with a talent for tracking shadow beasts.",
  },
];

const getCharacterStorageKey = (userId: string) =>
  `zalantha.characters.${userId}`;

const readCharacters = (userId: string) => {
  if (typeof window === "undefined") {
    return defaultCharacters;
  }

  const storageKey = getCharacterStorageKey(userId);
  const raw = window.localStorage.getItem(storageKey);

  if (!raw) {
    window.localStorage.setItem(storageKey, JSON.stringify(defaultCharacters));
    return defaultCharacters;
  }

  try {
    const parsed = JSON.parse(raw) as Character[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fall back to defaults below.
  }

  window.localStorage.setItem(storageKey, JSON.stringify(defaultCharacters));
  return defaultCharacters;
};

export default function BackendClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = cognitoConfigSummary.missing.length === 0;
  const missingConfig = cognitoConfigSummary.missing;

  useEffect(() => {
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
        setUserId(currentUser.userId ?? currentUser.username);
        const session = await fetchAuthSession();
        const rawDisplayName =
          session.tokens?.idToken?.payload?.name ??
          session.tokens?.idToken?.payload?.email ??
          currentUser.username;
        setUserName(String(rawDisplayName));
      } catch (caught) {
        setUserId(null);
        setUserName(null);
        if (
          caught instanceof Error &&
          !caught.message.toLowerCase().includes("authenticated")
        ) {
          setError(caught.message);
        }
      } finally {
        setStatus("ready");
      }
    };

    load();
  }, [isConfigured]);

  useEffect(() => {
    if (!userId) {
      setCharacters([]);
      return;
    }

    setCharacters(readCharacters(userId));
  }, [userId]);

  const handleLogin = async () => {
    if (!isConfigured) {
      return;
    }

    await signInWithRedirect();
  };

  const handleGoogleLogin = async () => {
    if (!isConfigured) {
      return;
    }

    await signInWithRedirect({ provider: "Google" });
  };

  const handleLogout = async () => {
    setStatus("loading");
    await signOut();
    setUserName(null);
    setUserId(null);
    setCharacters([]);
    setStatus("ready");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/70">
            Adventurer Archive
          </p>
          <h1 className="mt-3 text-3xl text-ink md:text-4xl">
            Saved Characters
          </h1>
          <p className="mt-3 text-sm text-ink/80 md:text-base">
            Sign in with your Knights of Zalantha account to review the
            characters you&apos;ve stored for upcoming campaigns.
          </p>
        </div>

        {!isConfigured ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 text-sm text-rose-900">
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
        ) : (
          <div className="flex flex-wrap gap-3">
            {userName ? (
              <>
                <div className="rounded-full border border-ink/20 bg-parchment/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-ink/80">
                  Signed in as {userName}
                </div>
                <button
                  className="btn-primary text-xs uppercase tracking-[0.2em]"
                  onClick={handleLogout}
                  disabled={status === "loading"}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-primary btn-primary--shimmer text-xs uppercase tracking-[0.2em]"
                  onClick={handleLogin}
                  disabled={status === "loading"}
                >
                  Sign in
                </button>
                {/* <button
                  className="btn-primary text-xs uppercase tracking-[0.2em]"
                  onClick={handleGoogleLogin}
                  disabled={status === "loading"}
                >
                  Continue with Google
                </button> */}
              </>
            )}
          </div>
        )}

        {error ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
            {error}
          </div>
        ) : null}
      </div>

      {userName ? (
        <div className="grid gap-4 md:grid-cols-2">
          {characters.map((character) => (
            <div
              key={character.id}
              className="rounded-2xl border border-ink/10 bg-parchment/70 p-5 shadow-[0_16px_40px_rgba(58,42,36,0.12)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-ink">{character.name}</h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-ink/60">
                    Level {character.level} {character.calling}
                  </p>
                </div>
                <span className="rounded-full border border-ink/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink/70">
                  {character.faction}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/80">{character.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
                <span>Lineage: {character.lineage}</span>
                <span>Last Played: {character.lastPlayed}</span>
              </div>
              <div className="mt-5 flex gap-3">
                <Link
                  href="/character-sheet"
                  className="btn-primary btn-primary--shimmer text-[11px] uppercase tracking-[0.3em]"
                >
                  Open Sheet
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-parchment/40 p-8 text-center text-sm text-ink/70">
          Sign in to see your saved characters.
        </div>
      )}
    </div>
  );
}
