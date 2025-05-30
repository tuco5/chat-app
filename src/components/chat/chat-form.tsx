"use client";

import { z } from "zod";
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
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  sender: z.enum(["User", "Client", "UserSystem"]),
  client_id: z.string().min(1, "Client ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ChatForm({
  clientId,
  whoseId,
}: {
  clientId: string;
  whoseId: "Client" | "User";
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      sender: whoseId,
      client_id: clientId,
    },
  });

  async function onSubmit(values: FormValues) {
    console.log("Form submitted:", values);
    const { error } = await supabase
      .from("messages")
      .insert([values]);

    if (error) console.error(error);

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
