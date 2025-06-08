"use client";
import { useState } from "react";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { SignupForm } from "@/src/components/auth/SignupForm";

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
