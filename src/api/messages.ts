import { supabase } from "@/lib/supabase";
import { Database } from "@/schemas/db-schema";
import { FormValues } from "@/schemas/validation-schema";

export type Message =
  Database["public"]["Tables"]["messages"]["Row"];

/**
 * Creates a new message in the messages table.
 *
 * @param values - The values to insert in the messages table.
 * @returns The newly created message if successful, null otherwise.
 * @throws {Error} If the message could not be sent
 */
export async function newMessage(
  values: FormValues
): Promise<Message | null> {
  const { data, error } = await supabase
    .from("messages")
    .insert([values])
    .select();

  if (error) {
    throw new Error("Failed to send message", error);
  }
  return data[0];
}

/**
 * Updates a message in the messages table to mark it as delivered.
 *
 * @param message - The message to update.
 * @returns The updated message if successful, null otherwise.
 * @throws {Error} If the message could not be updated
 */
export async function updateDeliveredMessage(
  message: Message
): Promise<Message | null> {
  const delivered_at = new Date().toISOString();

  const { error, data } = await supabase
    .from("messages")
    .update({
      delivered_at,
    })
    .eq("id", message.id)
    .select();

  if (error) {
    throw new Error("Failed to send message", error);
  }
  return data[0];
}

/**
 * Fetches all messages for a given client, sorted by creation date in ascending order.
 *
 * @param clientId - The ID of the client to fetch messages for.
 * @returns An array of messages if successful, null otherwise.
 * @throws {Error} If the messages could not be fetched
 */
export async function getMessagesByClientId(
  clientId: string
): Promise<Message[] | null> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch messages", error);
  }
  return data;
}
