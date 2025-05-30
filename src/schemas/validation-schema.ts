import z from "zod";

const formSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  sender: z.enum(["User", "Client", "UserSystem"]),
  client_id: z.string().min(1, "Client ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { FormValues };
