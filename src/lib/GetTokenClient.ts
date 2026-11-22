import { authClient } from "@/lib/auth-client";

export const getTokenByClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("[GetTokenClient] ❌ Failed to get token:", error);
    return null;
  }

  console.log("[GetTokenClient] 🔑 Got token from client:", data?.token);
  return data?.token ?? null;
};