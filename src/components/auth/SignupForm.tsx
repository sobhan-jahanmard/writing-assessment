import { signup } from "@/src/lib/supabase/auth.service";
import { Button } from "@/src/components/ui/button";

const translations = {
  title: "ثبت نام",
  email: "ایمیل",
  password: "رمز عبور",
  submit: "ثبت نام",
  toggle: "قبلاً ثبت نام کرده‌اید؟ وارد شوید",
};

interface SignupFormProps {
  onToggle: () => void;
}

export function SignupForm({ onToggle }: SignupFormProps) {
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          {translations.title}
        </h2>
      </div>

      <form className="mt-8 space-y-6" dir="rtl">
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
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
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
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button type="submit" formAction={signup} className="w-full">
            {translations.submit}
          </Button>

          <button
            type="button"
            onClick={onToggle}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {translations.toggle}
          </button>
        </div>
      </form>
    </div>
  );
}
