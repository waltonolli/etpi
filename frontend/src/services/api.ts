import type { Lead, LeadFormData } from "../types/lead";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {}

export async function createLead(data: LeadFormData): Promise<Lead> {
  const response = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(body?.detail ?? "Não foi possível enviar o formulário. Tente novamente.");
  }

  return response.json();
}
