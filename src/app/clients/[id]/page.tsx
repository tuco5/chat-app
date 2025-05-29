import { getClientById } from "@/api/clients";
import ChatBox from "./_components/chat-box";
import ChatForm from "./_components/chat-form";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  // TODO: fetch message history for the client

  return (
    <main className="p-4 h-[94.5vh] flex flex-col items-center bg-linear-to-br from-white to-blue-100 dark:from-gray-950 dark:to-gray-900">
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl pb-14">
        <h1 className="w-full text-3xl font-bold">
          {client.name}
        </h1>
        <ChatBox />
        <ChatForm clientId={id} />
      </div>
    </main>
  );
}
