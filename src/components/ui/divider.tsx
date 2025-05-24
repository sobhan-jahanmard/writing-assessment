import { cn } from "@/src/lib/utils";
import React from "react";

export const Divider: React.FC<
  React.InputHTMLAttributes<HTMLDivElement> & {
    vertical?: boolean;
    dot?: boolean;
  }
> = ({ className, vertical, dot, ...rest }) => {
  return dot ? (
    <div {...rest} className={cn("w-1 bg-foreground h-1", className)} />
  ) : vertical ? (
    <div {...rest} className={cn("w-[1px] bg-foreground h-full", className)} />
  ) : (
    <div {...rest} className={cn("w-full bg-foreground h-[1px]", className)} />
  );
};
Divider.displayName = "Divider";
