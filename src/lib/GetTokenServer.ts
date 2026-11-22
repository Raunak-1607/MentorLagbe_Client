import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenByServer = async () => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  return token;
};