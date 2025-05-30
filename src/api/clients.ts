import { notFound } from "next/navigation";

export type Client = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const API_BASE_URL =
  "https://sellia-files.s3.us-east-2.amazonaws.com/challenge";

/**
 * Fetches a list of clients from the server.
 *
 * @returns {Promise<Client[]>} A promise that resolves to an array of Client objects.
 */

export function getClients(): Promise<Client[]> {
  return fetch(`${API_BASE_URL}/clients.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

/**
 * Fetches a client by ID from the server.
 *
 * @param {string} id - The ID of the client to fetch.
 * @returns {Promise<Client>} A promise that resolves to the Client object with the specified ID.
 * @throws Will call `notFound` if a client with the specified ID does not exist.
 */

export function getClientById(id: string): Promise<Client> {
  return fetch(`${API_BASE_URL}/clients.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) =>
    (response.json() as Promise<Client[]>).then(
      (clients) => {
        const client = clients.find(
          (client) => client._id === id
        );
        if (!client) notFound();

        return client;
      }
    )
  );
}
