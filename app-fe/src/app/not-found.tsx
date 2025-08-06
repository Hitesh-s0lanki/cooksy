import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen">
      <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
      <div className="h-1 w-16 rounded bg-primary my-3 md:my-7"></div>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800">
        Page Not Found
      </p>
      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link
          href="/"
          className="bg-gray-800 hover:bg-black px-7 py-2.5 mt-6 text-white rounded-md active:scale-95 transition-all"
        >
          Return Home
        </Link>
      </Button>
    </div>
  );
}
