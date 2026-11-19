import { Button } from "@/components/ui/button";

export interface MyTuitionCardProps  {
  title: string;
  mode: "Online" | "Offline";
  daysPerWeek: number;
  monthlyFee: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
};

const statusStyles = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-600",
};

export function MyTuitionCard({
  title,
  mode,
  daysPerWeek,
  monthlyFee,
  approvalStatus,
  isActive,
}: MyTuitionCardProps) {
  return (
    <tr className="border-t">
      <td className="px-5 py-4">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{mode} · {daysPerWeek} days a week</p>
      </td>
      <td className="px-5 py-4">৳{monthlyFee.toLocaleString()}</td>
      <td className="px-5 py-4">
        <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyles[approvalStatus]}`}>
          {approvalStatus}
        </span>
      </td>
      <td className="px-5 py-4">
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
          {isActive ? "Active" : "Closed"}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm">Edit</Button>
          <Button type="button" variant="outline" size="sm">Close</Button>
          <Button type="button" variant="destructive" size="sm">Delete</Button>
        </div>
      </td>
    </tr>
  );
}
