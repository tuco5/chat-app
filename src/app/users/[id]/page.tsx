import { supabase } from "@/lib/supabase";
import { getClientById } from "@/api/clients";
import ChatBox from "@/components/chat/chat-box";
import ChatForm from "@/components/chat/chat-form";
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

  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: true });

  return (
    <main className="p-4 h-screen flex flex-col items-center">
      <header className="flex items-center justify-between w-full max-w-6xl mb-6">
        <SelliaLogo />
        <nav className="flex gap-2 items-center">
          <ThemeToggle />
          <GithubLogo />
        </nav>
      </header>
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl pb-14">
        <h1 className="text-3xl font-bold">
          👋 Hello {client.name}
        </h1>
        <ChatBox serverData={data ?? []} whoseId="Client" />
        <ChatForm clientId={id} whoseId="Client" />
      </div>
    </main>
  );
}
