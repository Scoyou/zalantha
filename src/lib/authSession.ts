import { fetchAuthSession } from "aws-amplify/auth";

export const getAuthToken = async () => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("Unable to load a Cognito id token for API requests.");
  }

  return token;
};
