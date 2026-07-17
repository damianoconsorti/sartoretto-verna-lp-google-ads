import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { trackLeadConversion } from '../lib/tracking';

const ease = [0.22, 1, 0.36, 1] as const;

const ZAPIER_URL = 'https://hooks.zapier.com/hooks/catch/1977593/4y67td9/';

const projectTypes = ['Ampliamento', 'Ristrutturazione', 'Nuova apertura', 'Trasferimento', 'Restyling', 'Altro'];

interface FormState {
  nome: string;
  cognome: string;
  farmacia: string;
  email: string;
  telefono: string;
  citta: string;
  tipologia: string;
  messaggio: string;
}

const empty: FormState = {
  nome: '', cognome: '', farmacia: '', email: '', telefono: '', citta: '', tipologia: '', messaggio: '',
};

const inputCls =
  'bg-transparent border-b border-[#ccc] text-[#0a0a0a] text-base font-sans font-light py-3 w-full focus:outline-none focus:border-[#0a0a0a] transition-colors duration-200 placeholder:text-[#bbb]';

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm tracking-[0.28em] uppercase font-sans text-[#666] font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(k: keyof FormState, v: string) {
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
        tipo_progetto: form.tipologia,
        nome_farmacia: form.farmacia,
        citta: form.citta,
        messaggio: form.messaggio,
        pagina: window.location.href,
        origine: 'github-pages-sartoretto-verna-lp',
      };

      await fetch(ZAPIER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });
      trackLeadConversion();
      setSent(true);
    } catch {
      setError('Si è verificato un errore. Riprova o chiamaci.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contatti" className="border-t border-[#e0e0e0] scroll-mt-[120px] md:scroll-mt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="px-6 md:px-14 lg:px-20 py-16 md:py-28 flex flex-col justify-between gap-12 bg-[#ebebeb] lg:border-r border-[#ddd]"
        >
          <div>
            <p className="text-teal text-sm tracking-[0.32em] uppercase font-sans font-semibold mb-5">
              Parla con un Architect Manager
            </p>
            <h2
              className="font-display text-[#0a0a0a] uppercase leading-none mb-7"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
            >
              Hai in mente<br />
              un progetto?
            </h2>
            <p className="text-[#444] text-base md:text-lg font-sans font-light leading-relaxed max-w-[38ch]">
              Raccontaci la tua farmacia. Il nostro team ti risponderà entro 48 ore lavorative per una prima valutazione del progetto e dei prossimi passi.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {['Risposta entro 48 ore lavorative', 'Analisi orientativa della tua esigenza', 'Percorso progettuale definito su misura'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#0a0a0a] shrink-0" />
                <span className="text-[#555] text-base font-sans">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="px-6 md:px-14 lg:px-16 py-16 md:py-28 bg-[#f5f5f5]"
        >
          {sent ? (
            <div className="flex flex-col gap-5">
              <div className="w-12 h-1 bg-green-500" />
              <h3 className="font-display text-[#0a0a0a] uppercase text-3xl md:text-4xl leading-none">
                Messaggio inviato.
              </h3>
              <p className="text-green-600 text-base md:text-lg font-sans font-semibold leading-relaxed">
                Grazie! Ti ricontatteremo entro 48 ore lavorative.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>

              {/* Nome + Cognome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Nome" id="nome">
                  <input id="nome" type="text" required autoComplete="given-name" placeholder="Mario"
                    value={form.nome} onChange={(e) => update('nome', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Cognome" id="cognome">
                  <input id="cognome" type="text" required autoComplete="family-name" placeholder="Rossi"
                    value={form.cognome} onChange={(e) => update('cognome', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Email + Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Email" id="email">
                  <input id="email" type="email" required autoComplete="email" placeholder="mario@farmacia.it"
                    value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Telefono" id="telefono">
                  <input id="telefono" type="tel" autoComplete="tel" placeholder="+39 06 1234567"
                    value={form.telefono} onChange={(e) => update('telefono', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Città + Nome farmacia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Città" id="citta">
                  <input id="citta" type="text" placeholder="Es. Roma"
                    value={form.citta} onChange={(e) => update('citta', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Nome farmacia" id="farmacia">
                  <input id="farmacia" type="text" placeholder="Farmacia Centrale"
                    value={form.farmacia} onChange={(e) => update('farmacia', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Select tipologia */}
              <Field label="Tipo di progetto" id="tipologia">
                <select id="tipologia" required value={form.tipologia}
                  onChange={(e) => update('tipologia', e.target.value)}
                  className={`${inputCls} cursor-pointer appearance-none bg-transparent`}
                >
                  <option value="" disabled>Seleziona una tipologia…</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>

              {/* Messaggio */}
              <Field label="Messaggio (opzionale)" id="messaggio">
                <textarea id="messaggio" rows={4} placeholder="Descrivi brevemente la tua farmacia e il progetto…"
                  value={form.messaggio} onChange={(e) => update('messaggio', e.target.value)}
                  className={`${inputCls} resize-none`} />
              </Field>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto self-start inline-flex items-center justify-center gap-4 bg-[#0a0a0a] text-white font-sans font-bold text-sm tracking-[0.22em] uppercase px-8 py-4 hover:bg-acid hover:text-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0a0a0a] disabled:hover:text-white"
                >
                  {sending ? 'Invio in corso…' : 'Prenota una consulenza →'}
                </button>

                {error && (
                  <p className="text-red-600 text-sm font-sans font-medium">
                    {error}
                  </p>
                )}

                <p className="text-[#aaa] text-sm font-sans">
                  Inviando accetti la nostra{' '}
                  <a href="#" className="underline hover:text-[#555] transition-colors">Privacy Policy</a>.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
