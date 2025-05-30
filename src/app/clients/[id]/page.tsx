import { getClientById } from "@/api/clients";
import ChatBox from "@/components/chat/chat-box";
import ChatForm from "@/components/chat/chat-form";
import { supabase } from "@/lib/supabase";

export default async function ClientPage({
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
    <main className="p-4 h-[94.5vh] flex flex-col items-center bg-linear-to-br from-white to-blue-100 dark:from-gray-950 dark:to-gray-900">
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl pb-14">
        <h1 className="w-full text-3xl font-bold">
          {client.name}
        </h1>
        <ChatBox serverData={data ?? []} whoseId="User" />
        <ChatForm clientId={id} whoseId="User" />
      </div>
    </main>
  );
}
