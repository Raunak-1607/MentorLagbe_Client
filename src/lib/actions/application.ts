import type { Application } from "@/types/application";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
};

export const createApplication = async (applicationData: {
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
}) => {
  const res = await fetch(`${getBaseUrl()}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, ...data };
};

export const getApplications = async (query?: {
  studentEmail?: string;
  tutorEmail?: string;
  tuitionId?: string;
}): Promise<Application[]> => {
  const params = new URLSearchParams();
  if (query?.studentEmail) params.append("studentEmail", query.studentEmail);
  if (query?.tutorEmail) params.append("tutorEmail", query.tutorEmail);
  if (query?.tuitionId) params.append("tuitionId", query.tuitionId);

  try {
    const res = await fetch(`${getBaseUrl()}/applications?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};
