type AuthTokens = {
  idToken: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
};

const authApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "",
};

const requiredConfig = [
  { key: "baseUrl", env: "NEXT_PUBLIC_AUTH_API_BASE_URL" },
] as const;

export const getMissingAuthApiConfig = () =>
  requiredConfig
    .filter(({ key }) => !authApiConfig[key])
    .map(({ env }) => env);

export const authApiConfigSummary = {
  ...authApiConfig,
  missing: getMissingAuthApiConfig(),
};

const getApiBaseUrl = () => authApiConfig.baseUrl.replace(/\/+$/, "");

export const signInWithAuthApi = async (
  email: string,
  password: string,
): Promise<AuthTokens> => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to sign in (${response.status} ${response.statusText}).`,
    );
  }

  const payload = (await response.json()) as AuthTokens;
  if (!payload.idToken) {
    throw new Error("Auth API did not return an id token.");
  }

  return payload;
};

export const signUpWithAuthApi = async (
  email: string,
  password: string,
  name?: string,
) => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to sign up (${response.status} ${response.statusText}).`,
    );
  }
};

export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`/api/auth/reset/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to request password reset (${response.status} ${response.statusText}).`,
    );
  }
};

export const confirmPasswordReset = async (
  token: string,
  newPassword: string,
) => {
  const response = await fetch(`/api/auth/reset/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to reset password (${response.status} ${response.statusText}).`,
    );
  }
};
