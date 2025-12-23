import { fetchAuthSession } from "aws-amplify/auth";

type StoredTokens = {
  idToken: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
};

export type LocalUser = {
  userId: string;
  name?: string;
  email?: string;
};

const storageKey = "zalantha.auth.tokens";

const decodeJwtPayload = (token: string) => {
  const payload = token.split(".")[1];
  if (!payload) {
    return null;
  }

  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const getStoredTokens = (): StoredTokens | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredTokens;
  } catch {
    return null;
  }
};

export const setStoredTokens = (tokens: StoredTokens) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(tokens));
};

export const clearStoredTokens = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
};

export const getLocalUser = (): LocalUser | null => {
  const tokens = getStoredTokens();
  if (!tokens?.idToken) {
    return null;
  }

  const payload = decodeJwtPayload(tokens.idToken);
  if (!payload || typeof payload.sub !== "string") {
    return null;
  }

  const name =
    typeof payload.name === "string"
      ? payload.name
      : typeof payload.email === "string"
        ? payload.email
        : undefined;

  return {
    userId: payload.sub,
    name,
    email: typeof payload.email === "string" ? payload.email : undefined,
  };
};

const isTokenExpired = (tokens: StoredTokens) => {
  if (!tokens.expiresAt) {
    return false;
  }

  return Date.now() / 1000 >= tokens.expiresAt;
};

export const getAuthToken = async () => {
  const tokens = getStoredTokens();
  if (tokens?.idToken && !isTokenExpired(tokens)) {
    return tokens.idToken;
  }

  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("Unable to load a Cognito id token for API requests.");
  }

  return token;
};
