"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { type Client } from "@/api/clients";
import { avatarFallback } from "@/utils/avatar-fallback";
import { getUnreadMessagesCount } from "@/api/messages";
import { cn } from "@/utils/cn";
import { BounceLoader } from "react-spinners";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function ClientCard({ client }: { client: Client }) {
  const queryClient = useQueryClient();

  const { data: count, isLoading } = useQuery({
    queryFn: async () => {
      return await getUnreadMessagesCount(client._id);
    },
    queryKey: ["unread_messages_count", client._id],
  });

  useEffect(() => {
    const channel = supabase.channel("notifications").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `client_id=eq.${client._id}`,
      },
      () => {
        queryClient.invalidateQueries({
          queryKey: ["unread_messages_count", client._id],
        });
      }
    );

    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [client._id, queryClient]);

  const badgeStyle =
    count && count > 0 ? "bg-rose-500" : "bg-gray-500";
  return (
    <Link
      key={client._id}
      href={`/clients/${client._id}`}
      className="flex items-center p-4 gap-4 border rounded-lg shadow hover:shadow-lg transition-shadow w-full bg-sidebar/60"
    >
      <Avatar className="w-12 h-12 border-2 border-blue-300 ">
        <AvatarImage
          src=""
          alt={`@${client.name}'s avatar`}
        />
        <AvatarFallback className="bg-blue-600 text-white">
          {avatarFallback(client.name)}
        </AvatarFallback>
      </Avatar>
      <p className="font-bold text-lg">{client.name}</p>
      <div className="relative ml-auto flex items-center h-8 w-8 justify-center">
        <MessageCircle className="text-primary" size={24} />
        <span
          className={cn(
            "absolute bottom-0 right-0 text-xs rounded-full h-4 w-4 text-white flex items-center justify-center",
            badgeStyle
          )}
        >
          {isLoading ? (
            <BounceLoader color="white" size={14} />
          ) : (
            count ?? 0
          )}
        </span>
      </div>
    </Link>
  );
}
