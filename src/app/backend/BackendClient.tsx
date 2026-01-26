"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import { cognitoConfigSummary, configureAmplify } from "@/lib/cognito";
import {
  characterApiConfigSummary,
  fetchCharacters,
  type Character,
} from "@/lib/characterApi";

const getCharacterStorageKey = (userId: string) =>
  `zalantha.characters.${userId}`;

const readCharacters = (userId: string) => {
  if (typeof window === "undefined") {
    return [];
  }

  const storageKey = getCharacterStorageKey(userId);
  const raw = window.localStorage.getItem(storageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Character[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fall back to defaults below.
  }

  return [];
};

const writeCharacters = (userId: string, nextCharacters: Character[]) => {
  if (typeof window === "undefined") {
    return;
  }

  const storageKey = getCharacterStorageKey(userId);
  window.localStorage.setItem(storageKey, JSON.stringify(nextCharacters));
};

const classOptions = ["Fighter", "Rogue", "Mage", "Bard", "War Priest"];
const factionOptions = ["Orcs", "Dwarves", "Elves", "Humans", "Beastfolk"];

export default function BackendClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [characterError, setCharacterError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Character | null>(null);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: "",
    name: "",
    faction: "",
    class: "",
    level: 1,
    backstory: "",
    lastPlayed: "",
  });

  const isConfigured = cognitoConfigSummary.missing.length === 0;
  const missingConfig = cognitoConfigSummary.missing;
  const isCharacterApiConfigured =
    characterApiConfigSummary.missing.length === 0;
  const missingCharacterConfig = characterApiConfigSummary.missing;

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setStatus("loading");
      setError(null);
      let resolvedUser = false;
      try {
        if (isConfigured) {
          configureAmplify();
          const currentUser = await getCurrentUser();
          setUserId(currentUser.userId ?? currentUser.username);
          const session = await fetchAuthSession();
          const rawDisplayName =
            session.tokens?.idToken?.payload?.name ??
            session.tokens?.idToken?.payload?.email ??
            currentUser.username;
          setUserName(String(rawDisplayName));
          resolvedUser = true;
          return;
        }
      } catch (caught) {
        if (
          caught instanceof Error &&
          !caught.message.toLowerCase().includes("authenticated")
        ) {
          setError(caught.message);
        }
      }

      if (!resolvedUser) {
        try {
          const response = await fetch("/api/auth/me", {
            credentials: "same-origin",
          });
          if (response.ok) {
            const payload = (await response.json()) as {
              userId: string;
              name?: string;
              email?: string;
            };
            if (!isCancelled) {
              setUserId(payload.userId);
              setUserName(
                payload.name ?? payload.email ?? payload.userId ?? null,
              );
            }
            resolvedUser = true;
          }
        } catch {
          // Leave unresolved.
        }
      }

      if (!resolvedUser && !isCancelled) {
        setUserId(null);
        setUserName(null);
      }

      if (!isCancelled) {
        setStatus("ready");
      }
    };

    load();
    return () => {
      isCancelled = true;
    };
  }, [isConfigured]);

  useEffect(() => {
    if (!userId) {
      setCharacters([]);
      setCharacterError(null);
      setIsLoadingCharacters(false);
      return;
    }

    let isCancelled = false;

    const loadCharacters = async () => {
      setIsLoadingCharacters(true);
      setCharacterError(null);
      try {
        if (isCharacterApiConfigured) {
          const apiCharacters = await fetchCharacters();
          if (!isCancelled) {
            setCharacters(apiCharacters);
          }
          return;
        }

        if (!isCancelled) {
          setCharacters(readCharacters(userId));
        }
      } catch (caught) {
        if (!isCancelled) {
          setCharacterError(
            caught instanceof Error
              ? caught.message
              : "Unable to load characters from the API.",
          );
          setCharacters(readCharacters(userId));
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingCharacters(false);
        }
      }
    };

    loadCharacters();

    return () => {
      isCancelled = true;
    };
  }, [userId, isCharacterApiConfigured]);

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
    if (isConfigured) {
      configureAmplify();
      await signOut();
    }
    await fetch("/api/auth/logout", { method: "POST" });
    setUserName(null);
    setUserId(null);
    setCharacters([]);
    setStatus("ready");
  };

  const handleCreateCharacter = async (event: FormEvent) => {
    event.preventDefault();
    if (!userId) {
      return;
    }

    setCharacterError(null);
    setIsSaving(true);

    const trimmedId = newCharacter.id.trim();
    const classValue = newCharacter.class.trim();
    const factionValue = newCharacter.faction.trim();
    if (
      !classOptions.includes(classValue) ||
      !factionOptions.includes(factionValue)
    ) {
      setCharacterError("Please choose a class and faction from the list.");
      setIsSaving(false);
      return;
    }
    const nextCharacter: Character = {
      ...newCharacter,
      id: trimmedId || `char-${Date.now()}`,
      name: newCharacter.name.trim() || "Untitled Adventurer",
      backstory:
        newCharacter.backstory.trim() ||
        "A new recruit, ready for their first adventure.",
      class: classValue,
      faction: factionValue,
      lastPlayed: newCharacter.lastPlayed.trim() || "Never",
      level: Number.isFinite(newCharacter.level)
        ? Math.max(1, Math.floor(newCharacter.level))
        : 1,
    };

    const nextCharacters = [nextCharacter, ...characters];

    try {
      await persistCharacters(nextCharacters, userId);

      setCharacters(nextCharacters);
      setNewCharacter({
        id: "",
        name: "",
        class: "",
        backstory: "",
        level: 1,
        faction: "",
        lastPlayed: "",
      });
    } catch (caught) {
      setCharacterError(
        caught instanceof Error
          ? caught.message
          : "Unable to save the new character.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewCharacterChange = <Key extends keyof Character>(
    key: Key,
    value: Character[Key],
  ) => {
    setNewCharacter((prev) => ({ ...prev, [key]: value }));
  };

  const persistCharacters = async (
    nextCharacters: Character[],
    fallbackUserId: string,
  ) => {
    if (isCharacterApiConfigured) {
      const { saveCharacters } = await import("@/lib/characterApi");
      await saveCharacters(nextCharacters);
      return;
    }

    writeCharacters(fallbackUserId, nextCharacters);
  };

  const handleEditStart = (character: Character) => {
    setEditingId(character.id);
    setEditDraft({ ...character });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditDraft(null);
  };

  const handleEditChange = <Key extends keyof Character>(
    key: Key,
    value: Character[Key],
  ) => {
    setEditDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleEditSave = async () => {
    if (!userId || !editDraft) {
      return;
    }

    setCharacterError(null);
    setIsSaving(true);

    const classValue = editDraft.class.trim();
    const factionValue = editDraft.faction.trim();
    if (
      !classOptions.includes(classValue) ||
      !factionOptions.includes(factionValue)
    ) {
      setCharacterError("Please choose a class and faction from the list.");
      setIsSaving(false);
      return;
    }
    const nextCharacter: Character = {
      ...editDraft,
      name: editDraft.name.trim() || "Untitled Adventurer",
      backstory:
        editDraft.backstory.trim() ||
        "A new recruit, ready for their first adventure.",
      class: classValue,
      faction: factionValue,
      lastPlayed: editDraft.lastPlayed.trim() || "Never",
      level: Number.isFinite(editDraft.level)
        ? Math.max(1, Math.floor(editDraft.level))
        : 1,
    };

    const nextCharacters = characters.map((character) =>
      character.id === nextCharacter.id ? nextCharacter : character,
    );

    try {
      await persistCharacters(nextCharacters, userId);
      setCharacters(nextCharacters);
      setEditingId(null);
      setEditDraft(null);
    } catch (caught) {
      setCharacterError(
        caught instanceof Error
          ? caught.message
          : "Unable to save character changes.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCharacter = async (characterId: string) => {
    if (!userId) {
      return;
    }

    const nextCharacters = characters.filter(
      (character) => character.id !== characterId,
    );

    setCharacterError(null);
    setIsSaving(true);

    try {
      await persistCharacters(nextCharacters, userId);
      setCharacters(nextCharacters);
      if (editingId === characterId) {
        setEditingId(null);
        setEditDraft(null);
      }
    } catch (caught) {
      setCharacterError(
        caught instanceof Error
          ? caught.message
          : "Unable to delete the character.",
      );
    } finally {
      setIsSaving(false);
    }
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
          {!userId && <p className="mt-3 text-sm text-ink/80 md:text-base">
            Sign in with your Knights of Zalantha account to review the
            characters you&apos;ve stored for upcoming campaigns.
          </p>}
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
        ) : !isCharacterApiConfigured ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-900">
            <p className="font-semibold">
              Character API configuration needed
            </p>
            <p className="mt-2 text-amber-900/80">
              Add the following environment values to load characters from AWS:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs uppercase tracking-[0.2em]">
              {missingCharacterConfig.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {userName ? (
              <>
                <div className="rounded-full border border-ink/20 bg-parchment/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#1f140f]">
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
                <Link
                  href="/sign-in"
                  className="btn-primary btn-primary--shimmer text-xs uppercase tracking-[0.2em]"
                >
                  Sign in
                </Link>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-parchment/90 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ink/80 transition hover:border-ink/50"
                  onClick={handleGoogleLogin}
                  disabled={status === "loading"}
                  type="button"
                  aria-label="Sign in with Google"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                    className="h-4 w-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 5.95 1.54 7.31 2.82l5-4.82C33.26 4.46 29.03 2.5 24 2.5 14.95 2.5 7.39 7.95 4.41 15.83l5.88 4.57C11.82 14.11 17.48 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.1 24.5c0-1.65-.15-2.85-.47-4.1H24v7.77h12.7c-.26 2.1-1.66 5.26-4.77 7.38l6.15 4.78c3.68-3.4 5.99-8.41 5.99-15.83Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.29 28.07c-.43-1.27-.68-2.62-.68-4.07 0-1.45.25-2.8.66-4.07l-5.86-4.57C3.14 18.2 2.4 21.04 2.4 24c0 2.96.74 5.8 2.01 8.64l5.88-4.57Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 45.5c5.03 0 9.26-1.66 12.34-4.5l-6.15-4.78c-1.64 1.13-3.83 1.92-6.19 1.92-6.52 0-12.18-4.61-14.06-10.9L4.06 31.8C7.04 39.67 14.95 45.5 24 45.5Z"
                    />
                  </svg>
                  Sign in with Google
                </button>
                <Link
                  href="/sign-in?mode=sign-up"
                  className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink/70 transition hover:border-ink/50"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}

        {error ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
            {error}
          </div>
        ) : null}
        {characterError ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
            {characterError}
          </div>
        ) : null}
      </div>

      {userName ? (
        <div className="space-y-6">
          <form
            className="rounded-2xl border border-ink/10 bg-parchment/70 p-5 shadow-[0_16px_40px_rgba(58,42,36,0.12)]"
            onSubmit={handleCreateCharacter}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl text-ink">Create a new character</h2>
                <button
                  className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                  type="submit"
                  disabled={isSaving || status === "loading"}
                >
                  {isSaving ? "Saving..." : "Save Character"}
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Name
                  <input
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    value={newCharacter.name}
                    onChange={(event) =>
                      handleNewCharacterChange("name", event.target.value)
                    }
                    placeholder="Seren Vale"
                  />
                </label>
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Class
                  <select
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    value={newCharacter.class}
                    onChange={(event) =>
                      handleNewCharacterChange("class", event.target.value)
                    }
                  >
                    <option value="">Select a class</option>
                    {classOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Level
                  <input
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    type="number"
                    min={1}
                    value={newCharacter.level}
                    onChange={(event) =>
                      handleNewCharacterChange(
                        "level",
                        Number(event.target.value),
                      )
                    }
                  />
                </label>
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Faction
                  <select
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    value={newCharacter.faction}
                    onChange={(event) =>
                      handleNewCharacterChange("faction", event.target.value)
                    }
                  >
                    <option value="">Select a faction</option>
                    {factionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                  Last Played
                  <input
                    className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                    value={newCharacter.lastPlayed}
                    onChange={(event) =>
                      handleNewCharacterChange(
                        "lastPlayed",
                        event.target.value,
                      )
                    }
                    placeholder="2025-01-12"
                  />
                </label>
              </div>
              <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                Backstory
                <textarea
                  className="mt-2 min-h-[100px] rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                  value={newCharacter.backstory}
                  onChange={(event) =>
                    handleNewCharacterChange("backstory", event.target.value)
                  }
                  placeholder="A steadfast shield-bearer who vows to guard the eastern caravans."
                />
              </label>
            </div>
          </form>

          {isLoadingCharacters ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="rounded-2xl border border-ink/10 bg-parchment/60 p-5 shadow-[0_16px_40px_rgba(58,42,36,0.12)]"
                >
                  <div className="space-y-4 blur-[1px]">
                    <div className="h-6 w-2/3 rounded-full bg-ink/10" />
                    <div className="h-4 w-1/2 rounded-full bg-ink/10" />
                    <div className="h-16 w-full rounded-2xl bg-ink/10" />
                    <div className="h-4 w-1/3 rounded-full bg-ink/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : characters.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="rounded-2xl border border-ink/10 bg-parchment/70 p-5 shadow-[0_16px_40px_rgba(58,42,36,0.12)]"
                >
                  {editingId === character.id && editDraft ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl text-ink">Edit character</h2>
                        <div className="flex gap-2">
                          <button
                            className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                            type="button"
                            onClick={handleEditSave}
                            disabled={isSaving}
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </button>
                          <button
                            className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                            type="button"
                            onClick={handleEditCancel}
                            disabled={isSaving}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Name
                          <input
                            className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            value={editDraft.name}
                            onChange={(event) =>
                              handleEditChange("name", event.target.value)
                            }
                          />
                        </label>
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Backstory
                          <textarea
                            className="mt-2 min-h-[100px] rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            value={editDraft.backstory}
                            onChange={(event) =>
                              handleEditChange("backstory", event.target.value)
                            }
                          />
                        </label>
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Class
                          <select
                            className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            value={editDraft.class}
                            onChange={(event) =>
                              handleEditChange("class", event.target.value)
                            }
                          >
                            <option value="">Select a class</option>
                            {classOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Level
                          <input
                            className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            type="number"
                            min={1}
                            value={editDraft.level}
                            onChange={(event) =>
                              handleEditChange(
                                "level",
                                Number(event.target.value),
                              )
                            }
                          />
                        </label>
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Faction
                          <select
                            className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            value={editDraft.faction}
                            onChange={(event) =>
                              handleEditChange("faction", event.target.value)
                            }
                          >
                            <option value="">Select a faction</option>
                            {factionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col text-xs uppercase tracking-[0.2em] text-ink/60">
                          Last Played
                          <input
                            className="mt-2 rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2 text-sm text-ink"
                            value={editDraft.lastPlayed}
                            onChange={(event) =>
                              handleEditChange(
                                "lastPlayed",
                                event.target.value,
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl text-ink">{character.name}</h2>
                          <p className="text-xs uppercase tracking-[0.25em] text-ink/60">
                            Level {character.level} {character.class}
                          </p>
                        </div>
                        <span className="rounded-full border border-ink/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink/70">
                          {character.faction}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-ink/80">
                        {character.backstory}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
                        <span>Last Played: {character.lastPlayed}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href="/character-sheet"
                          className="btn-primary btn-primary--shimmer text-[11px] uppercase tracking-[0.3em]"
                        >
                          Open Sheet
                        </Link>
                        <button
                          className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                          type="button"
                          onClick={() => handleEditStart(character)}
                          disabled={isSaving}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-primary text-[11px] uppercase tracking-[0.3em]"
                          type="button"
                          onClick={() => handleDeleteCharacter(character.id)}
                          disabled={isSaving}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-ink/20 bg-parchment/40 p-8 text-center text-sm text-ink/70">
              No characters yet. Add a character above to see it here.
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-parchment/40 p-8 text-center text-sm text-ink/70">
          Sign in to see your saved characters.
        </div>
      )}
    </div>
  );
}
