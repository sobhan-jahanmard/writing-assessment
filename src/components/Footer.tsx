import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            آیلتس پرو
          </Link>
          <span className="flex gap-3 items-center">
            <span>تماس با پشتیبانی:</span>
            <div className="flex flex-col items-start text-sm" dir="ltr">
              <a href="tel:+989123456789" className="hover:underline">
                +98 936 934 8660
              </a>
              <a
                href="mailto:contact@writing-assessment.com"
                className="hover:underline"
              >
                s.jahanmad@gmail.com
              </a>
            </div>
          </span>
        </div>
      </div>
    </footer>
  );
};
