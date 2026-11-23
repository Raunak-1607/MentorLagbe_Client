import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL as string);
export const db = client.db("MentorLagbe");

// Resolve the canonical app URL: explicit env var > Vercel auto-inject > localhost
const APP_URL =
  process.env.BETTER_AUTH_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL: APP_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    APP_URL,
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
  ],
  secret: process.env.BETTER_AUTH_SECRET as string,
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      role: {
        type: ["student", "tutor", "admin"],
        required: false,
        defaultValue: "student",
        input: true,
      },
      plan: {
        type: ["free", "pro"],
        defaultValue: "free",
        input: false,
      },
      bio: {
        type: "string",
        defaultValue: " ",
        input: false,
      }
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
   plugins: [
        jwt(), 
    ],
    session: {
      cookieCache: {
        enabled: true,
     maxAgexAge: 7 * 24 * 60 * 60,    
      }
    }
});
