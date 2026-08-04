export interface LeadFormData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cargo?: string;
  numero_colaboradores?: string;
  mensagem?: string;
  plano_interesse?: string;
}

export interface Lead extends LeadFormData {
  id: string;
  status: "novo" | "em_contato" | "qualificado" | "convertido" | "descartado";
  criado_em: string;
}
