import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface px-6 text-center">
      <h1 className="font-serif text-3xl md:text-5xl text-text-primary mb-4">
        We couldn't find this page.
      </h1>
      <p className="text-text-muted mb-8 text-lg max-w-md">
        It might have been moved or removed.
      </p>
      <Button asChild className="h-12 px-8">
        <Link href="/">
          RETURN HOME
        </Link>
      </Button>
    </div>
  );
}
