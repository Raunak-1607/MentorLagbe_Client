import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenByServer = async () => {
  try {
    const token = await auth.api.getToken({
      headers: await headers(),
    });
    return token;
  } catch {
    return null;
  }
};