"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تایید ایمیل | ارزیابی رایتینگ آیلتس",
  description: "لطفاً ایمیل خود را برای تکمیل فرآیند ثبت نام بررسی کنید",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg bg-card">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            لطفاً ایمیل خود را بررسی کنید
          </h2>
          <p className="mt-2 text-muted-foreground">
            یک لینک تایید به ایمیل شما ارسال شده است. لطفاً برای تکمیل ثبت نام،
            روی لینک کلیک کنید.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/auth"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            بازگشت به صفحه ورود
          </Link>
          <p className="text-center text-sm text-muted-foreground gap-2 flex items-center justify-center">
            <Link href="/auth" className="text-primary hover:text-primary/80">
              ورود / ثبت نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
