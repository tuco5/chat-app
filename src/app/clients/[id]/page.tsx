import { getClientById } from "@/api/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBox from "./_components/chat-box";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  // TODO: fetch message history for the client

  return (
    <main className="p-4 h-[94.5vh] flex flex-col items-center bg-linear-to-br from-white to-blue-100 dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl pb-14">
        <h1 className="w-full text-3xl font-bold">
          {client.name}
        </h1>
        <ChatBox id={id} />
        <div className="flex items-center gap-4 w-full">
          <Input
            type="text"
            placeholder="Type your message here..."
            className="w-full h-12 text-lg shadow-xl bg-white dark:bg-background"
            autoFocus
          />
          <Button
            className="bg-blue-600 text-white text-lg hover:bg-blue-500 h-12 shadow-lg"
            size="lg"
          >
            Send
          </Button>
        </div>
      </div>
    </main>
  );
}
