export type ApplicationStatus = "pending" | "accepted" | "rejected";

export type Application = {
  _id?: string;
  id?: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorName?: string;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  mode?: string;
  status: ApplicationStatus;
  appliedAt: string | Date;
};
