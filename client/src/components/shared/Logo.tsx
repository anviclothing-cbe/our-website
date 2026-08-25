import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

export function Logo({ className, imageClassName, onClick }: LogoProps) {
  return (
    <Link href="/">
      <a 
        className={cn(
          "inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-surface-accent focus:ring-offset-2 rounded-sm", 
          className
        )}
        onClick={onClick}
        aria-label="ANVI Home"
      >
        <img 
          src="/anvi_main_logo.png" 
          alt="ANVI" 
          className={cn("h-16 md:h-20 w-auto object-contain drop-shadow-lg", imageClassName)}
        />
      </a>
    </Link>
  );
}
