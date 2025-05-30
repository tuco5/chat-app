"use client";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { getClients } from "@/api/clients";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { avatarFallback } from "@/utils/avatar-fallback";
import { MessageCircle } from "lucide-react";

export default function ChatsPage() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getClients,
  });

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Chats </h1>

      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        <MoonLoader
          color="dodgerblue"
          size={40}
          loading={isLoading}
        />
        {clients?.map((client) => (
          <Link
            key={client._id}
            href={`/clients/${client._id}`}
            className="flex items-center p-4 gap-4 border rounded-lg shadow hover:shadow-lg transition-shadow w-full bg-sidebar/60"
          >
            <Avatar className="w-12 h-12 border-2 border-blue-300 dark:border-blue-500">
              <AvatarImage
                src=""
                alt={`@${client.name}'s avatar`}
              />
              <AvatarFallback>
                {avatarFallback(client.name)}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold text-lg">
              {client.name}
            </p>
            <div className="relative ml-auto flex items-center h-8 w-8 justify-center">
              <MessageCircle
                className="text-primary"
                size={24}
              />
              <span className="absolute bottom-0 right-0 text-xs rounded-full bg-rose-500 h-4 w-4 text-white flex items-center justify-center">
                9
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
