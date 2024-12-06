"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface InputWithButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  buttonText: string;
}

export function InputWithButton({
  className,
  buttonText,
  ...props
}: InputWithButtonProps) {
  return (
    <div className="flex rounded-lg shadow-sm shadow-black/5">
      <Input
        id="input-21"
        className={cn(
          "-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10",
          className,
        )}
        placeholder="Email"
        type="email"
        disabled
        {...props}
      />
      <button
        className="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm font-medium text-foreground outline-offset-2 transition-colors hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled
      >
        <ArrowRight className="size-4 block md:hidden" />
        <span className="sr-only">{buttonText}</span>
        <span className="hidden md:block">{buttonText}</span>
      </button>
    </div>
  );
}
