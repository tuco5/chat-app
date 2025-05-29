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

const formSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  clientId: z.string().min(1, "Client ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ChatForm({
  clientId,
}: {
  clientId: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      clientId: clientId,
    },
  });

  function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // Clear form after submission
    form.reset({
      text: "",
      clientId: clientId,
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
          name="clientId"
          value={clientId}
        />
        <Button
          className="bg-blue-600 text-white text-lg hover:bg-blue-500 h-12 shadow-lg"
          size="lg"
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting
          }
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
