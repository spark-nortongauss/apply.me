import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition",
        variant === "default"
          ? "bg-primary text-white hover:bg-primary/90"
          : "border border-primary text-primary hover:bg-primary/5",
        className
      )}
      {...props}
    />
  );
}
