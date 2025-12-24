import { Amplify } from "aws-amplify";

const splitEnvList = (value: string) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const cognitoConfig = {
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "",
  userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "",
  domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "",
  redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNIN ?? "",
  redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNOUT ?? "",
  redirectSignInList: splitEnvList(
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNIN ?? "",
  ),
  redirectSignOutList: splitEnvList(
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNOUT ?? "",
  ),
};

let isConfigured = false;

const requiredConfig = [
  { key: "userPoolId", env: "NEXT_PUBLIC_COGNITO_USER_POOL_ID" },
  { key: "userPoolClientId", env: "NEXT_PUBLIC_COGNITO_CLIENT_ID" },
  { key: "domain", env: "NEXT_PUBLIC_COGNITO_DOMAIN" },
  { key: "redirectSignIn", env: "NEXT_PUBLIC_COGNITO_REDIRECT_SIGNIN" },
  { key: "redirectSignOut", env: "NEXT_PUBLIC_COGNITO_REDIRECT_SIGNOUT" },
] as const;

export const getMissingCognitoConfig = () =>
  requiredConfig
    .filter(({ key }) => !cognitoConfig[key])
    .map(({ env }) => env);

export const configureAmplify = () => {
  if (isConfigured || getMissingCognitoConfig().length > 0) {
    return;
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoConfig.userPoolId,
        userPoolClientId: cognitoConfig.userPoolClientId,
        loginWith: {
          oauth: {
            domain: cognitoConfig.domain,
            scopes: ["openid", "email", "profile"],
            redirectSignIn:
              cognitoConfig.redirectSignInList.length > 0
                ? cognitoConfig.redirectSignInList
                : [cognitoConfig.redirectSignIn],
            redirectSignOut:
              cognitoConfig.redirectSignOutList.length > 0
                ? cognitoConfig.redirectSignOutList
                : [cognitoConfig.redirectSignOut],
            responseType: "code",
            providers: ["Google"],
          },
        },
      },
    },
  });

  isConfigured = true;
};

export const cognitoConfigSummary = {
  ...cognitoConfig,
  missing: getMissingCognitoConfig(),
};
