import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/MentorLagbe";
const client = new MongoClient(mongoUri);
export const db = client.db("MentorLagbe");

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`] : []),
  ],
  secret: process.env.BETTER_AUTH_SECRET || "build_dummy_secret_for_next_build_step",
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder_google_client_id", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder_google_client_secret", 
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
        input: false,
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
