import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL as string);
export const db = client.db("MentorLagbe");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
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
