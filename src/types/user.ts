export type UserRole = "student" | "tutor" | "admin";
export type UserPlan = "free" | "pro";

export type AppUser = {
  _id?: string;
  id?: string;
  name?: string;
  email: string;
  role?: UserRole;
  plan?: UserPlan;
  phoneNumber?: string;
  bio?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
