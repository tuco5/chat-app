export type Message = {
  _id: string;
  clientId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string | null;
  readAt: string | null;
  typeUser: "User" | "Client" | "UserSystem";
};
