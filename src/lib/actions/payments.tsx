import { getTokenByClient } from "@/lib/GetTokenClient";

export const checkoutVerify = async (sessionId: string) => {
  const token = await getTokenByClient();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Barer ${token}` } : {}),
    },
    body: JSON.stringify({ sessionId }),
  });
  return res.json();
};