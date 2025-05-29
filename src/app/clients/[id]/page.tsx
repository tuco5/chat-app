import { getClientById } from "@/api/clients";
import { Button } from "@/components/ui/button";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  console.log("Client data:", client);

  return (
    <main className="p-4 h-[94vh] flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 w-full h-full max-w-4xl">
        <h1 className="w-full text-3xl font-bold">{client.name}</h1>
        <div className="flex flex-col gap-4 w-full border border-muted rounded-xl h-full p-4 bg-card">
          chat history
        </div>
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full p-4 border border-muted rounded-xl"
            autoFocus
          />
          <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors">
            Send
          </Button>
        </div>
      </div>
    </main>
  );
}
