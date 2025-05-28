import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <h2 className="text-8xl font-bold">404</h2>
      <p>Not found</p>
      <Button
        asChild
        className="mt-8 text-lg py-6 px-8 bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-300"
      >
        <Link href="/">
          <MoveLeft /> Back Home
        </Link>
      </Button>
    </div>
  );
}
