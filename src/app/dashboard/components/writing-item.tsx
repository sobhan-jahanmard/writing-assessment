import { WritingWithLatestAssessment } from "@/src/lib/supabase/types";
import { getWritingTypeLabels } from "@/src/lib/get-writing-type-labels";
import Link from "next/link";

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

  return (
    <Link href={href} className="contents">
      <tr className="border-b">
        <td className="px-6 py-4">{writingWithLatestAssessment?.writing_id}</td>
        <td className="px-6 py-4">
          {getWritingTypeLabels(writingWithLatestAssessment?.type || "")}
        </td>
        <td
          className="px-6 py-4 max-w-md whitespace-pre-wrap font-sans-serif text-left"
          dir="ltr"
          style={{ direction: "ltr" }}
        >
          {writingWithLatestAssessment?.question}
        </td>
        <td
          className="px-6 py-4 font-sans-serif"
          dir="ltr"
          style={{ direction: "ltr" }}
        >
          {formatDate(writingWithLatestAssessment?.created_at)}
        </td>
        <td className="px-6 py-4 font-bold">
          {writingWithLatestAssessment?.latest_assessment?.status?.toUpperCase() ||
            "-"}
        </td>
      </tr>
    </Link>
  );
};
