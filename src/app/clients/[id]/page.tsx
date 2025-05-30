import { getClientById } from "@/api/clients";
import ChatBox from "@/components/chat/chat-box";
import ChatForm from "@/components/chat/chat-form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
        <div className="flex items-center gap-4 w-full">
          <Button
            className="rounded-full w-10 h-10"
            variant="ghost"
            asChild
          >
            <Link href="/clients">
              <ArrowLeft className="h-8 w-8" />
            </Link>
          </Button>
          <h1 className="w-full text-3xl font-bold">
            {client.name}
          </h1>
        </div>
        <ChatBox serverData={data ?? []} whoseId="User" />
        <ChatForm clientId={id} whoseId="User" />
      </div>
    </main>
  );
}
