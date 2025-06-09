"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/supabase/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { LogOutIcon } from "lucide-react";
import { logout } from "../lib/supabase/auth.service";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-background fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navbar */}
        <div className="flex justify-between h-16 border-b border-border">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">آیلتس پرو</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/80">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {getUserInitials(
                          user.user_metadata?.full_name || user?.email
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-foreground/60 hover:text-foreground hover:bg-accent px-1 py-1 rounded-md"
                >
                  <LogOutIcon />
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent"
            >
              <span className="sr-only">باز کردن منو</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Secondary navbar with info links */}
        {/* <div className="hidden md:flex justify-start py-2 border-b border-border">
          <div className="flex gap-8">
            <Link
              href="#how-it-works"
              className="text-foreground/80 hover:text-primary"
            >
              نحوه کار
            </Link>
            <Link
              href="#pricing"
              className="text-foreground/80 hover:text-primary"
            >
              قیمت‌ها
            </Link>
          </div>
        </div> */}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              ویژگی‌ها
            </Link>
            {/* <Link
              href="#how-it-works"
              className="block px-3 py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              نحوه کار
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              قیمت‌ها
            </Link> */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3 px-3 py-2">
                    <span className="text-foreground/80">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {getUserInitials(
                          user.user_metadata?.full_name || user?.email
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </Link>
              </>
            ) : (
              <Link
                href="/auth"
                className="block px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                onClick={() => setIsMenuOpen(false)}
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
