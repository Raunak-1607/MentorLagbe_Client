import type { AppUser } from "@/types/user";
import { getTokenByClient } from "@/lib/GetTokenClient";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
};

export const getUsers = async (): Promise<AppUser[]> => {
  try {
    const res = await fetch(`${getBaseUrl()}/users`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const updateUser = async (
  id: string,
  data: Partial<AppUser>
) => {
  const token = await getTokenByClient();
  try {
    const res = await fetch(`${getBaseUrl()}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { authorization: `Barer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    return { ok: res.ok, ...result };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { ok: false, message: err.message };
  }
};
