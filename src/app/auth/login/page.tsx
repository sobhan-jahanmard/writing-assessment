import { LoginForm } from "@/src/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود / ثبت نام | ارزیابی رایتینگ آیلتس",
  description: "ورود یا ثبت نام در سامانه ارزیابی رایتینگ آیلتس",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoginForm />
    </div>
  );
}
