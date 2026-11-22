import { getTokenByServer } from "@/lib/GetTokenServer";
import { getTokenByClient } from "@/lib/GetTokenClient";

export const checkoutVerify = async (sessionId: string) => {
  let token: string | null = null;
  try {
    if (typeof window === "undefined") {
      const serverToken = await getTokenByServer();
      token = typeof serverToken === "string" ? serverToken : (serverToken?.token ?? null);
    } else {
      token = await getTokenByClient();
    }
  } catch {
    token = null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
  const res = await fetch(`${baseUrl}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Barer ${token}` } : {}),
    },
    body: JSON.stringify({ sessionId }),
  });
  return res.json();
};
