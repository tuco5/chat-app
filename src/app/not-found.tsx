"use client";
import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen text-center justify-center">
      <div className="h-1/2">
        <h2 className="text-8xl font-bold">404</h2>
        <p>Not found</p>
        <div className="mt-8 flex gap-4 items-center">
          <Button
            onClick={() => router.back()}
            className="text-lg py-6 px-8 bg-blue-600 text-white hover:bg-blue-500"
          >
            <MoveLeft /> Back
          </Button>
          <Button
            asChild
            className="text-lg h-12 w-12"
            variant="outline"
          >
            <Link href="/">
              <Home className="h-8 w-8" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
