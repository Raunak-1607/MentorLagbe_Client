import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenByServer = async () => {
  try {
    const token = await auth.api.getToken({
      headers: await headers(),
    });
    console.log("[GetTokenServer] 🔑 Server token:", typeof token === "string" ? token : token?.token);
    return token;
  } catch (err) {
    console.error("[GetTokenServer] ❌ Server token error:", err);
    return null;
  }
};