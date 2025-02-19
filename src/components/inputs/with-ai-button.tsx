"use client";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { useId, useRef, useTransition } from "react";

interface WithAIInputProps extends React.ComponentProps<typeof Input> {
  hancleClick?: () => Promise<void>;
}

export function WithAIInput({ hancleClick, ...props }: WithAIInputProps) {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    startTransition(async () => {
      await hancleClick?.();
    });
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        className="pe-9"
        type="text"
        readOnly
        {...props}
      />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onClick}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed"
              aria-label={isPending ? "Generating..." : "Generate with AI"}
              disabled={isPending}
            >
              <div
                className={cn(
                  "transition-all",
                  isPending ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              >
                <Check
                  className="stroke-emerald-500"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  isPending ? "scale-0 opacity-0" : "scale-100 opacity-100",
                )}
              >
                <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            {isPending ? "Generating..." : "Generate with AI"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
