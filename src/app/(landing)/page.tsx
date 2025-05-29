import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="text-center max-w-2xl flex flex-col items-center mt-20 gap-12">
        <h1 className="md:text-5xl text-4xl font-bold mb-4">
          Connect Instantly. <br />
          Chat Seamlessly.
        </h1>
        <p className="text-lg px-4">
          A blazing-fast chat app built with Next.js —
          experience real-time messaging like never before.
        </p>
        <Button
          asChild
          className="text-lg py-6 px-10 bg-blue-600 text-white hover:bg-blue-500"
        >
          <Link href="/clients">Start as Agent 🚀</Link>
        </Button>

        <div className="flex items-center gap-2 w-full text-muted-foreground">
          <hr className="w-1/2" />
          <p className="text-nowrap">or Login as:</p>
          <hr className="w-1/2" />
        </div>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            className="text-lg py-6 px-10 bg-gray-300/20"
          >
            <Link href="/chat/629a8125b2d313190810212f">
              Pedro 😎
            </Link>
          </Button>
          <span className="text-muted-foreground">or</span>
          <Button
            asChild
            variant="secondary"
            className="text-lg py-6 px-10 bg-gray-300/20"
          >
            <Link href="/chat/629e39e8b2d31319081e0650">
              Diego 🙂
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
