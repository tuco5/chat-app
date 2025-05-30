"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  formSchema,
  type FormValues,
} from "@/schemas/validation-schema";
import { useMutation } from "@tanstack/react-query";
import {
  newMessage,
  updateDeliveredMessage,
} from "@/api/messages";

export default function ChatForm({
  clientId,
  whoseId,
}: {
  clientId: string;
  whoseId: "Client" | "User";
}) {
  /* MUTATIONS */
  const { mutate: mutateDeliveredMessage } = useMutation({
    mutationFn: updateDeliveredMessage,
    onError: (error) => {
      console.error(
        "Error updating delivered message:",
        error
      );
    },
  });

  const { mutate: mutateNewMessage } = useMutation({
    mutationFn: newMessage,
    onSuccess: (message) => {
      if (!message) return;
      mutateDeliveredMessage(message);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  /* FORM */
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      sender: whoseId,
      client_id: clientId,
    },
  });

  async function onSubmit(values: FormValues) {
    mutateNewMessage(values);

    form.reset({
      text: "",
      client_id: clientId,
      sender: whoseId,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full h-12 text-lg shadow-xl bg-white dark:bg-background"
                  autoFocus
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <input
          type="hidden"
          name="client_id"
          value={clientId}
        />
        <input
          type="hidden"
          name="sender"
          value={whoseId}
        />
        <Button
          className="bg-blue-600 text-white text-lg hover:bg-blue-500 h-12 shadow-lg"
          size="lg"
          type="submit"
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
