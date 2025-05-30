import { getClientById } from "@/api/clients";
import ChatBox from "@/components/chat/chat-box";
import ChatForm from "@/components/chat/chat-form";
import GithubLogo from "@/components/layout/github-logo";
import { SelliaLogo } from "@/components/layout/sellia-logo";
import ThemeToggle from "@/components/layout/theme-toggle";
import { getMessagesByClientId } from "@/api/messages";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  const data = await getMessagesByClientId(id);

  return (
    <main className="p-2 flex flex-col items-center h-screen">
      <header className="flex items-center justify-between w-full max-w-6xl mb-6">
        <SelliaLogo />
        <nav className="flex gap-2 items-center">
          <ThemeToggle />
          <GithubLogo />
        </nav>
      </header>
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl">
        <h1 className="text-3xl font-bold">
          👋 Hello {client.name}
        </h1>
        <ChatBox
          serverData={data ?? []}
          whoseId="Client"
          clientId={id}
        />
        <ChatForm clientId={id} whoseId="Client" />
      </div>
    </main>
  );
}
