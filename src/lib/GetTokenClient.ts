import { authClient } from "@/lib/auth-client";

export const getTokenByClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.token ?? null;
};