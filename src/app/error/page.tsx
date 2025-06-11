import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خطا | ارزیابی رایتینگ آیلتس",
  description:
    "متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید.",
};

export default function ErrorPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      dir="rtl"
    >
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">مشکلی پیش آمده است</h2>
          <p className="mt-2 text-sm">
            از این پیش‌آمد عذرخواهی می‌کنیم. لطفاً دوباره تلاش کنید یا به صفحه
            اصلی بازگردید.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
