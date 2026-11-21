import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
export const db = client.db("MentorLagbe");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: true,
      },
      role: {
        type: ["student", "tutor", "admin"],
        required: true,
        defaultValue: "student",
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
});
