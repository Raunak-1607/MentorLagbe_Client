export type Tuition = {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
};

// The tutor fills this data. The server creates the remaining fields.
export type CreateTuition = Omit<
  Tuition,
  "id" | "approvalStatus" | "isActive" | "createdAt"
>;
