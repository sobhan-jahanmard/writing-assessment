"use client";

import Link from "next/link";
import { useAuth } from "../lib/supabase/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { LogOutIcon } from "lucide-react";
import { logout } from "../lib/supabase/auth.service";

const Navbar = () => {
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
    <nav className="bg-background sticky w-full z-50">
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
                      <AvatarFallback className="pt-[5px]">
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
                href="/auth/login"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <span className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="block  bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <div className="flex items-center gap-3 px-3 py-2">
                    <span className="text-foreground/80" dir="ltr">
                      {(user.user_metadata?.full_name || user.email)?.slice(
                        0,
                        10
                      )}
                      ...
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
              </span>
            ) : (
              <Link
                href="/auth/login"
                className="block py-2 px-3  bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
