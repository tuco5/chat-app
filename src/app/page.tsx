import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <section className="text-center max-w-2xl flex flex-col items-center mt-20 gap-4">
        <h1 className="md:text-5xl text-4xl font-bold mb-4">
          Connect Instantly. <br />
          Chat Seamlessly.
        </h1>
        <p className="text-lg mb-8 px-4">
          A blazing-fast chat app built with Next.js and Socket.io — experience
          real-time messaging like never before.
        </p>
        <Button className="text-xl py-5 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
          Get Started 🚀
        </Button>
      </section>
    </main>
  );
}
