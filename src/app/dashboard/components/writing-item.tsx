import { WritingWithLatestAssessment } from "@/src/lib/supabase/types";
import { getWritingTypeLabels } from "@/src/lib/get-writing-type-labels";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export const WritingItem = ({
  writingWithLatestAssessment,
}: {
  writingWithLatestAssessment: WritingWithLatestAssessment;
}) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    const utcDate = new Date(dateString);
    const localDate = new Date(
      utcDate.getTime() - new Date().getTimezoneOffset() * 60000
    );

    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(localDate);
  };

  const href = `/writing/${writingWithLatestAssessment?.writing_id}`;

  const status: "completed" | "failed" | "pending" | undefined | null =
    writingWithLatestAssessment?.latest_assessment?.status;

  return (
    <Link href={href} className="contents">
      <tr className="border-b">
        <td className="px-6 py-4">{writingWithLatestAssessment?.writing_id}</td>
        <td className="px-6 py-4">
          {getWritingTypeLabels(writingWithLatestAssessment?.type || "")}
        </td>
        <td
          className="px-6 py-4 max-w-md font-sans-serif text-left"
          dir="ltr"
          style={{ direction: "ltr" }}
        >
          <div className="truncate whitespace-nowrap overflow-hidden">
            {writingWithLatestAssessment?.question}
          </div>
        </td>
        <td
          className="px-6 py-4 font-sans-serif"
          dir="ltr"
          style={{ direction: "ltr" }}
        >
          {formatDate(writingWithLatestAssessment?.created_at)}
        </td>
        <td
          className={cn(
            "px-6 py-4 font-bold",
            status === "completed" && "text-green-600",
            status === "failed" && "text-red-500",
            status === "pending" && "text-orange-400"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center text-center rounded-lg border px-2 pb-1 pt-2",
              status === "completed" && "border-green-600",
              status === "failed" && "border-red-500",
              status === "pending" && "border-orange-400"
            )}
          >
            {writingWithLatestAssessment?.latest_assessment?.status?.toUpperCase() ||
              "-"}
          </span>
        </td>
      </tr>
    </Link>
  );
};
