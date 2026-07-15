import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { trackLeadConversion } from '../lib/tracking';

const ease = [0.22, 1, 0.36, 1] as const;

const ZAPIER_URL = 'https://hooks.zapier.com/hooks/catch/1977593/4y67td9/';

interface QuickFormState {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

const empty: QuickFormState = { nome: '', cognome: '', email: '', telefono: '' };

const inputCls =
  'bg-white/5 border border-white/15 text-white text-sm font-sans font-light px-3 py-2 md:py-2.5 w-full rounded-none focus:outline-none focus:border-acid transition-colors duration-200 placeholder:text-white/35';

export default function QuickForm() {
  const [form, setForm] = useState<QuickFormState>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(k: keyof QuickFormState, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const payload: Record<string, string> = {
        nome: form.nome,
        cognome: form.cognome,
        email: form.email,
        telefono: form.telefono,
        pagina: window.location.href,
        origine: 'quick-form-google-ads',
      };

      await fetch(ZAPIER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });
      trackLeadConversion('quick-form');
      setSent(true);
    } catch {
      setError('Si è verificato un errore. Riprova o chiamaci.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="quick-consulenza" className="bg-[#111111] border-b border-white/10">
      <div className="px-5 md:px-14 lg:px-24 py-3.5 md:py-6">
        {sent ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-acid font-sans font-semibold text-sm md:text-base text-center py-2"
          >
            Grazie! Ti ricontatteremo entro 48 ore lavorative.
          </motion.p>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4"
          >
            <p className="hidden lg:block text-white/45 text-xs tracking-[0.2em] uppercase font-sans font-semibold shrink-0 pb-2.5">
              Consulenza gratuita
            </p>

            <div className="grid grid-cols-2 md:flex md:flex-1 gap-2 md:gap-4">
              <input
                type="text" required autoComplete="given-name" placeholder="Nome"
                aria-label="Nome"
                value={form.nome} onChange={(e) => update('nome', e.target.value)}
                className={inputCls}
              />
              <input
                type="text" required autoComplete="family-name" placeholder="Cognome"
                aria-label="Cognome"
                value={form.cognome} onChange={(e) => update('cognome', e.target.value)}
                className={inputCls}
              />
              <input
                type="email" required autoComplete="email" placeholder="Email"
                aria-label="Email"
                value={form.email} onChange={(e) => update('email', e.target.value)}
                className={inputCls}
              />
              <input
                type="tel" required autoComplete="tel" placeholder="Telefono"
                aria-label="Telefono"
                value={form.telefono} onChange={(e) => update('telefono', e.target.value)}
                className={inputCls}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="shrink-0 inline-flex items-center justify-center gap-3 bg-acid text-dark font-sans font-bold text-xs md:text-sm tracking-[0.14em] uppercase px-6 py-3 hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Invio…' : 'Richiedi Consulenza Gratuita'}
            </button>

            {error && (
              <p className="text-red-400 text-xs font-sans font-medium md:absolute md:-bottom-5">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  );
}
