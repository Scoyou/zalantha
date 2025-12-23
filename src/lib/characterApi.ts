import { getAuthToken } from "@/lib/authSession";

export type Character = {
  id: string;
  name: string;
  faction: string;
  class: string;
  level: number;
  backstory: string;
  lastPlayed: string;
};

const characterApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_CHARACTER_API_BASE_URL ?? "",
};

const requiredConfig = [
  { key: "baseUrl", env: "NEXT_PUBLIC_CHARACTER_API_BASE_URL" },
] as const;

export const getMissingCharacterApiConfig = () =>
  requiredConfig
    .filter(({ key }) => !characterApiConfig[key])
    .map(({ env }) => env);

export const characterApiConfigSummary = {
  ...characterApiConfig,
  missing: getMissingCharacterApiConfig(),
};

const getApiBaseUrl = () => characterApiConfig.baseUrl.replace(/\/+$/, "");

export const fetchCharacters = async (): Promise<Character[]> => {
  const baseUrl = getApiBaseUrl();
  const token = await getAuthToken();

  const response = await fetch(`${baseUrl}/characters`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load characters (${response.status} ${response.statusText}).`,
    );
  }

  const payload = (await response.json()) as { items?: Character[] };
  return Array.isArray(payload.items) ? payload.items : [];
};

export const saveCharacters = async (characters: Character[]) => {
  const baseUrl = getApiBaseUrl();
  const token = await getAuthToken();

  const response = await fetch(`${baseUrl}/characters`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: characters }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to save characters (${response.status} ${response.statusText}).`,
    );
  }
};
