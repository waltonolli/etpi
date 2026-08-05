import { FormEvent, useState } from "react";
import { createLead, ApiError } from "../services/api";
import type { LeadFormData } from "../types/lead";

interface LeadFormProps {
  planoSelecionado?: string;
}

const estadoInicial: LeadFormData = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  numero_colaboradores: "",
  mensagem: "",
};

export default function LeadForm({ planoSelecionado }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormData>(estadoInicial);
  const [status, setStatus] = useState<"idle" | "enviando" | "sucesso" | "erro">("idle");
  const [erro, setErro] = useState<string | null>(null);

  function handleChange(field: keyof LeadFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("enviando");
    setErro(null);
    try {
      await createLead({ ...form, plano_interesse: planoSelecionado });
      setStatus("sucesso");
      setForm(estadoInicial);
    } catch (err) {
      setStatus("erro");
      setErro(err instanceof ApiError ? err.message : "Erro inesperado. Tente novamente.");
    }
  }

  if (status === "sucesso") {
    return (
      <div className="rounded-2xl bg-rust/10 border border-rust/30 p-8 text-center">
        <h3 className="text-ink mb-2">Recebemos seu pedido!</h3>
        <p className="text-ink-soft">
          Nosso time entra em contato em até 1 dia útil para agendar a demonstração.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-rust underline underline-offset-4 cursor-pointer"
        >
          Enviar outro contato
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="nome">
          Nome *
        </label>
        <input
          id="nome"
          required
          value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="email">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="telefone">
          Telefone / WhatsApp *
        </label>
        <input
          id="telefone"
          required
          value={form.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)}
          placeholder="(47) 99999-9999"
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="empresa">
          Empresa
        </label>
        <input
          id="empresa"
          value={form.empresa}
          onChange={(e) => handleChange("empresa", e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="colaboradores">
          Nº de colaboradores
        </label>
        <input
          id="colaboradores"
          value={form.numero_colaboradores}
          onChange={(e) => handleChange("numero_colaboradores", e.target.value)}
          placeholder="ex: 50-150"
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-ink mb-1.5" htmlFor="mensagem">
          Mensagem (opcional)
        </label>
        <textarea
          id="mensagem"
          rows={3}
          value={form.mensagem}
          onChange={(e) => handleChange("mensagem", e.target.value)}
          className="w-full rounded-lg border border-ink/15 px-4 py-2.5 bg-white focus:border-gold outline-none resize-none"
        />
      </div>

      {planoSelecionado && (
        <p className="sm:col-span-2 text-sm text-rust font-medium">
          Interesse no plano: {planoSelecionado}
        </p>
      )}

      {status === "erro" && (
        <p className="sm:col-span-2 text-sm text-red-600" role="alert">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "enviando"}
        className="sm:col-span-2 rounded-full bg-gold text-ink py-3.5 font-semibold text-sm sm:text-base hover:bg-ink hover:text-parchment transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === "enviando" ? "Enviando..." : "Quero uma demonstração gratuita"}
      </button>
    </form>
  );
}
