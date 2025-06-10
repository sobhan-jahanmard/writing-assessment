"use client";
import { useState } from "react";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { SignupForm } from "@/src/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود / ثبت نام | ارزیابی رایتینگ آیلتس",
  description: "ورود یا ثبت نام در سامانه ارزیابی رایتینگ آیلتس",
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {isLogin ? (
        <LoginForm onToggle={() => setIsLogin(false)} />
      ) : (
        <SignupForm onToggle={() => setIsLogin(true)} />
      )}
    </div>
  );
}
