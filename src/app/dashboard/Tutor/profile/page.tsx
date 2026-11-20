import { redirect } from "next/navigation";

// Keeps the old sidebar URL working while the profile page uses update-profile.
export default function TutorProfilePage() {
  redirect("/dashboard/Tutor/update-profile");
}
