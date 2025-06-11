import { CreateAssessmentComponent } from "../components/create-assessment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ایجاد رایتینگ جدید | ارزیابی رایتینگ آیلتس",
  description: "ایجاد و ارسال رایتینگ جدید برای ارزیابی",
};

export default function Page() {
  return <CreateAssessmentComponent />;
}
