import { getClientById } from "@/api/clients";
import GithubLogo from "@/components/layout/github-logo";
import { SelliaLogo } from "@/components/layout/sellia-logo";
import ThemeToggle from "@/components/layout/theme-toggle";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  return (
    <main className="p-4 h-[94.5vh] flex flex-col items-center bg-linear-to-br from-white to-blue-100 dark:from-gray-950 dark:to-gray-900">
      <header className="flex items-center justify-between w-full max-w-6xl mb-6">
        <SelliaLogo />
        <nav className="flex gap-2 items-center">
          <ThemeToggle />
          <GithubLogo />
        </nav>
      </header>
      <h1 className="text-3xl font-bold">
        Hello {client.name} 👋
      </h1>
    </main>
  );
}
