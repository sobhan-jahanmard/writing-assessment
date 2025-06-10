import Link from "next/link";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl mt-10">
              <span className="block mb-6">ارزیابی رایتینگ آیلتس</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              در کمتر از{" "}
              <span className="text-bolder text-primary">۱۲ ساعت</span> - با
              پایین ترین قیمت و بالاترین کیفیت
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/submit"
                  className="w-full flex items-center justify-center border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2"
                >
                  ارسال نوشته
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              چرا سرویس ما؟
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">
                تحویل در ۱۲ ساعت
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                دریافت نتیجه ارزیابی در کمتر از ۱۲ ساعت، مناسب برای آمادگی‌های
                فوری
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">
                بدون نیاز به تایپ
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                تبدیل متن دستنویس شما به تایپ شده{" "}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">
                بازخورد دقیق
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                بازخورد جامع در مورد گرامر، واژگان و دستیابی به اهداف نوشتاری
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              نحوه کار
            </h2>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                    <span className="text-xl font-bold">۱</span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    ارسال نوشته
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    نوشته آیلتس خود را از طریق فرم ساده ارسال کنید
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                    <span className="text-xl font-bold">۲</span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    ارزیابی تخصصی
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    ممتحنین ما نوشته شما را با معیارهای رسمی آیلتس ارزیابی
                    می‌کنند
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                    <span className="text-xl font-bold">۳</span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    دریافت نتیجه
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    دریافت بازخورد دقیق و پیش‌بینی نمره در کمتر از ۱۲ ساعت
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              تعرفه‌ها
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="relative p-6 bg-card rounded-lg shadow-sm border border-border">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">
                  تسک ۱ آکادمیک
                </h3>
                <p className="mt-4 text-3xl font-bold text-primary">
                  ۱۵۰,۰۰۰ تومان
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  برای نمودارها و گراف‌ها
                </p>
              </div>
            </div>
            <div className="relative p-6 bg-card rounded-lg shadow-sm border border-border">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">
                  تسک 1 جنرال
                </h3>
                <p className="mt-4 text-3xl font-bold text-primary">
                  ۱۵۰,۰۰۰ تومان
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  برای نامه‌ها و مقالات
                </p>
              </div>
            </div>
            <div className="relative p-6 bg-card rounded-lg shadow-sm border border-border">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">
                  تسک ۲ آکادمیک
                </h3>
                <p className="mt-4 text-3xl font-bold text-primary">
                  ۲۰۰,۰۰۰ تومان
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  برای مقالات تحلیلی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
