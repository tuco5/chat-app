"use client";
import { Message } from "@/api/messages";
import { cn } from "@/utils/cn";
import { Check, CheckCheck, Clock } from "lucide-react";
import { useCallback } from "react";

const fakeMessages: Message[] = [
  {
    _id: "1",
    clientId: "1",
    text: "Hello, how can I help you today?",
    createdAt: "2023-06-01T10:00:00.000Z",
    updatedAt: "2023-06-01T10:00:00.000Z",
    deliveredAt: "2023-06-01T10:00:00.000Z",
    readAt: "2023-06-01T10:00:00.000Z",
    typeUser: "User",
  },
  {
    _id: "2",
    clientId: "1",
    text: "I have a question about my order.",
    createdAt: "2023-06-01T10:01:00.000Z",
    updatedAt: "2023-06-01T10:01:00.000Z",
    deliveredAt: "2023-06-01T10:01:00.000Z",
    readAt: "2023-06-01T10:01:00.000Z",
    typeUser: "Client",
  },
  {
    _id: "3",
    clientId: "1",
    text: "Sure, I can help with that.",
    createdAt: "2023-06-01T10:02:00.000Z",
    updatedAt: "2023-06-01T10:02:00.000Z",
    deliveredAt: null,
    readAt: null,
    typeUser: "User",
  },
];

export default function ChatBox({ id }: { id: string }) {
  return (
    <div className="w-full border border-accent rounded-xl h-full p-4 shadow-lg bg-white dark:bg-background">
      <div className="flex flex-col gap-2 w-full h-full overflow-y-auto">
        {fakeMessages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isClient = message.typeUser === "Client";

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

    if (message.readAt) {
      console.log("Message read at:", message.readAt);
      return (
        <CheckCheck
          className={cn("text-green-500", size)}
        />
      );
    }
    if (message.deliveredAt) {
      return (
        <Check className={cn("text-green-500", size)} />
      );
    }
    return <Clock className={size} />;
  }, [isClient, message.deliveredAt, message.readAt]);

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
        <p className="text-sm">
          {message.text}, {message.text}, {message.text}
        </p>
        <div className="flex gap-1">
          <span className="text-xs">
            {new Date(
              message.createdAt
            ).toLocaleTimeString()}
          </span>
          <MessageStatusIcon />
        </div>
      </div>
    </div>
  );
}
