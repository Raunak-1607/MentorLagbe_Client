import { authClient } from "@/lib/auth-client";

export const getTokenByClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    return null;
  }

  return data?.token ?? null;
};