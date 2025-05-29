"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowBigDownDash,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import { Message } from "@/api/messages";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/dates";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function ChatBox({
  serverData,
}: {
  serverData: Message[];
}) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [messages, setMessages] =
    useState<Message[]>(serverData);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((messages) => [
            ...messages,
            payload.new as Message,
          ]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>
  ) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.currentTarget;
    setIsAtBottom(
      scrollTop + clientHeight >= scrollHeight - 50
    );
  };

  return (
    <div className="w-full relative border border-accent rounded-xl h-[70vh] shadow-lg bg-white dark:bg-background">
      <div
        onScroll={handleScroll}
        className="flex flex-col gap-2 w-full h-full overflow-y-auto p-4"
      >
        {messages.map((message, index) => {
          const currentDate = formatDate(
            message.created_at
          );
          const prevDate =
            index > 0
              ? formatDate(messages[index - 1].created_at)
              : null;

          return (
            <div key={message.id}>
              <DateSeparator
                curr={currentDate}
                prev={prevDate ?? ""}
              />
              <MessageBubble
                key={message.id}
                message={message}
              />
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {!isAtBottom && (
        <Button
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-blue-600/50 text-white shadow-md hover:bg-blue-600 transition"
        >
          <ArrowBigDownDash />
        </Button>
      )}
    </div>
  );
}

function DateSeparator({
  curr,
  prev,
}: {
  curr: string;
  prev: string;
}) {
  const SeparatorLines = useCallback(
    () => (
      <hr className="flex-grow max-w-24 border-t border-gray-300 dark:border-gray-700" />
    ),
    []
  );

  const showDateSeparator = curr !== prev;
  if (!showDateSeparator) return null;

  return (
    <div className="flex items-center justify-center mb-4">
      <SeparatorLines />
      <span className="mx-4 text-xs text-muted-foreground p-1.5 rounded-sm bg-sidebar">
        🗓️ {curr}
      </span>
      <SeparatorLines />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isClient = message.sender === "Client";

  const bubbleSide = isClient
    ? "justify-start"
    : "justify-end";
  const bubbleColor = isClient
    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    : "bg-blue-600 text-white";
  const bubbleAlignment = isClient
    ? "items-start"
    : "items-end";

  const MessageStatusIcon = useCallback(() => {
    if (isClient) return null;

    const size = "w-4 h-4";

    if (message.read_at) {
      return (
        <CheckCheck
          className={cn("text-green-500", size)}
        />
      );
    }
    if (message.delivered_at) {
      return (
        <Check className={cn("text-green-500", size)} />
      );
    }
    return <Clock className={size} />;
  }, [isClient, message.delivered_at, message.read_at]);

  return (
    <div
      className={cn("flex items-start gap-2", bubbleSide)}
    >
      <div
        className={cn(
          "max-w-[45%] p-3 rounded-lg shadow-md flex flex-col gap-1",
          bubbleColor,
          bubbleAlignment
        )}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex gap-1">
          <span className="text-xs">
            {new Date(
              message.created_at
            ).toLocaleTimeString()}
          </span>
          <MessageStatusIcon />
        </div>
      </div>
    </div>
  );
}
