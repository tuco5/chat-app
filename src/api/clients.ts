import { notFound } from "next/navigation";

type Client = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const API_BASE_URL =
  "https://sellia-files.s3.us-east-2.amazonaws.com/challenge";

export function getClients(): Promise<Client[]> {
  return fetch(`${API_BASE_URL}/clients.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function getClientById(id: string): Promise<Client> {
  return fetch(`${API_BASE_URL}/clients.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) =>
    (response.json() as Promise<Client[]>).then((clients) => {
      const client = clients.find((client) => client._id === id);
      if (!client) notFound();

      return client;
    })
  );
}
