"use client";
import { login } from "@/src/lib/supabase/auth.service";
import { Button } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const translations = {
  title: "ورود",
  email: "ایمیل",
  password: "رمز عبور",
  submit: "ورود",
  toggle: `حساب کاربری ندارید؟  ثبت نام کنید`,
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      return login(formData);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          {translations.title}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
        dir="rtl"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              {translations.email}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              {translations.password}
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "در حال ورود..." : translations.submit}
          </Button>
          <Link
            href="/auth/signup"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {translations.toggle}
          </Link>
        </div>
      </form>
    </div>
  );
}
