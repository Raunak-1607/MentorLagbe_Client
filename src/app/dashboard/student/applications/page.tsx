import { redirect } from "next/navigation";

export default function StudentApplicationsRedirect() {
  redirect("/dashboard/student/my-applications");
}
