export type Exercise = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  status?: "pending" | "completed";
  completedAt?: string;
};
