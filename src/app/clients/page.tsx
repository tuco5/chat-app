import { getClients } from "@/api/clients";
import { ClientCard } from "./_components/client-card";

export default async function ChatsPage() {
  const data = await getClients();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Chats </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        {data?.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))}
      </div>
    </div>
  );
}
