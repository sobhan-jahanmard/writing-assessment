import { Suspense } from "react";
import Link from "next/link";

// Client component that uses useSearchParams
function NotFoundContent() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      dir="rtl"
    >
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">صفحه مورد نظر یافت نشد</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

// Server component that wraps the client component in Suspense
export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse">در حال بارگذاری...</div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
