import React, { FormEvent, ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { buildAttribution, isValidEmail, PRIVACY_URL, submitLead } from '../lib/forms';
import { redirectToThankYou } from '../lib/leadConversion';
import CallButton from './CallButton';
import AudienceNotice from './AudienceNotice';

const ease = [0.22, 1, 0.36, 1] as const;
const ZAPIER_URL = import.meta.env.VITE_MAIN_FORM_ENDPOINT || 'https://hooks.zapier.com/hooks/catch/1977593/44jzqgw/';
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

type FormField = keyof FormState;
type FormErrors = Partial<Record<FormField, string>>;

const empty: FormState = {
  nome: '', cognome: '', farmacia: '', email: '', telefono: '', citta: '', tipologia: '', messaggio: '',
};

const inputCls =
  'bg-transparent border-b text-[#0a0a0a] text-base font-sans font-normal py-3 min-h-11 w-full outline-none transition-colors duration-200 placeholder:text-[#777] focus-visible:border-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-teal/40';

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.nome.trim()) errors.nome = 'Inserisci il nome.';
  if (!form.cognome.trim()) errors.cognome = 'Inserisci il cognome.';
  if (!form.email.trim()) errors.email = 'Inserisci l’email.';
  else if (!isValidEmail(form.email)) errors.email = 'Inserisci un indirizzo email valido.';
  if (!form.farmacia.trim()) errors.farmacia = 'Inserisci il nome della farmacia.';
  if (!form.tipologia) errors.tipologia = 'Seleziona il tipo di progetto.';
  return errors;
}

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm tracking-[0.2em] uppercase font-sans text-[#555] font-semibold">
        {label}{required ? ' *' : ''}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const fieldRefs = useRef<Partial<Record<FormField, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

  function update(key: FormField, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitError('Correggi i campi indicati prima di inviare la richiesta.');
      const firstInvalid = (['nome', 'cognome', 'email', 'farmacia', 'tipologia'] as FormField[]).find((key) => nextErrors[key]);
      if (firstInvalid) requestAnimationFrame(() => fieldRefs.current[firstInvalid]?.focus());
      return;
    }

    submittingRef.current = true;
    setSending(true);
    setSubmitError(null);
    let redirecting = false;

    try {
      const payload: Record<string, string> = {
        nome: form.nome.trim(),
        cognome: form.cognome.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        tipo_progetto: form.tipologia,
        nome_farmacia: form.farmacia.trim(),
        citta: form.citta.trim(),
        messaggio: form.messaggio.trim(),
        origine: 'github-pages-sartoretto-verna-lp',
        ...buildAttribution('main_form'),
      };

      await submitLead(ZAPIER_URL, payload);
      // Invio riuscito: la conversione parte nella pagina /grazie/ (una sola volta). Il form resta bloccato fino al cambio pagina.
      redirecting = true;
      redirectToThankYou('main_form');
      window.setTimeout(() => {
        submittingRef.current = false;
        setSending(false);
      }, 8000);
    } catch {
      setSubmitError('Invio non riuscito. Verifica la connessione e riprova: i dati inseriti sono ancora disponibili.');
    } finally {
      if (!redirecting) {
        submittingRef.current = false;
        setSending(false);
      }
    }
  }

  const controlState = (field: FormField) => ({
    'aria-invalid': Boolean(errors[field]) as true | false,
    'aria-describedby': errors[field] ? `main-${field}-error` : undefined,
  });

  return (
    <section id="contatti" className="border-t border-[#e0e0e0] scroll-mt-[120px] md:scroll-mt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="px-6 md:px-14 lg:px-20 py-16 md:py-28 flex flex-col justify-between gap-12 bg-[#ebebeb] lg:border-r border-[#ddd]"
        >
          <div>
            <p className="text-teal text-sm tracking-[0.32em] uppercase font-sans font-semibold mb-5">Parliamo del tuo progetto</p>
            <h2 className="font-display text-[#0a0a0a] uppercase leading-none mb-7" style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}>
              Hai in mente<br />un progetto?
            </h2>
            <p className="text-[#333] text-base md:text-lg font-sans font-normal leading-relaxed max-w-[40ch]">
              Raccontaci la tua farmacia. Il nostro team risponde normalmente entro 24 ore lavorative per una prima valutazione del progetto e dei prossimi passi.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <p className="text-[#444] text-base font-sans">Preferisci parlarne a voce?</p>
              <CallButton location="contact_section" tone="light" className="self-start" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {['Tempo medio di risposta: 24 ore lavorative', 'Analisi orientativa della tua esigenza', 'Percorso progettuale definito su misura'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#0a0a0a] shrink-0" />
                <span className="text-[#444] text-base font-sans">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="px-6 md:px-14 lg:px-16 py-16 md:py-28 bg-[#f5f5f5]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate aria-describedby="main-form-status main-form-privacy">
            <p className="text-[#555] text-sm">I campi contrassegnati con * sono obbligatori.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Field label="Nome" id="main-nome" required error={errors.nome}>
                <input ref={(el) => { fieldRefs.current.nome = el; }} id="main-nome" name="nome" type="text" required autoComplete="given-name" placeholder="Mario" value={form.nome} onChange={(e) => update('nome', e.target.value)} className={`${inputCls} ${errors.nome ? 'border-red-600' : 'border-[#aaa]'}`} {...controlState('nome')} />
              </Field>
              <Field label="Cognome" id="main-cognome" required error={errors.cognome}>
                <input ref={(el) => { fieldRefs.current.cognome = el; }} id="main-cognome" name="cognome" type="text" required autoComplete="family-name" placeholder="Rossi" value={form.cognome} onChange={(e) => update('cognome', e.target.value)} className={`${inputCls} ${errors.cognome ? 'border-red-600' : 'border-[#aaa]'}`} {...controlState('cognome')} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Field label="Email" id="main-email" required error={errors.email}>
                <input ref={(el) => { fieldRefs.current.email = el; }} id="main-email" name="email" type="email" required autoComplete="email" placeholder="mario@farmacia.it" value={form.email} onChange={(e) => update('email', e.target.value)} className={`${inputCls} ${errors.email ? 'border-red-600' : 'border-[#aaa]'}`} {...controlState('email')} />
              </Field>
              <Field label="Telefono" id="main-telefono">
                <input ref={(el) => { fieldRefs.current.telefono = el; }} id="main-telefono" name="telefono" type="tel" autoComplete="tel" placeholder="+39 06 1234567" value={form.telefono} onChange={(e) => update('telefono', e.target.value)} className={`${inputCls} border-[#aaa]`} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Field label="Città" id="main-citta">
                <input ref={(el) => { fieldRefs.current.citta = el; }} id="main-citta" name="citta" type="text" autoComplete="address-level2" placeholder="Es. Roma" value={form.citta} onChange={(e) => update('citta', e.target.value)} className={`${inputCls} border-[#aaa]`} />
              </Field>
              <Field label="Nome farmacia" id="main-farmacia" required error={errors.farmacia}>
                <input ref={(el) => { fieldRefs.current.farmacia = el; }} id="main-farmacia" name="nome_farmacia" type="text" required placeholder="Farmacia Centrale" value={form.farmacia} onChange={(e) => update('farmacia', e.target.value)} className={`${inputCls} ${errors.farmacia ? 'border-red-600' : 'border-[#aaa]'}`} {...controlState('farmacia')} />
              </Field>
            </div>

            <Field label="Tipo di progetto" id="main-tipologia" required error={errors.tipologia}>
              <select ref={(el) => { fieldRefs.current.tipologia = el; }} id="main-tipologia" name="tipo_progetto" required value={form.tipologia} onChange={(e) => update('tipologia', e.target.value)} className={`${inputCls} cursor-pointer appearance-none ${errors.tipologia ? 'border-red-600' : 'border-[#aaa]'}`} {...controlState('tipologia')}>
                <option value="" disabled>Seleziona una tipologia…</option>
                {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </Field>

            <Field label="Messaggio (opzionale)" id="main-messaggio">
              <textarea ref={(el) => { fieldRefs.current.messaggio = el; }} id="main-messaggio" name="messaggio" rows={4} placeholder="Descrivi brevemente la tua farmacia e il progetto…" value={form.messaggio} onChange={(e) => update('messaggio', e.target.value)} className={`${inputCls} border-[#aaa] resize-none`} />
            </Field>

            <div className="flex flex-col gap-3">
              <button type="submit" disabled={sending} className="min-h-11 w-full sm:w-auto self-start inline-flex items-center justify-center bg-[#0a0a0a] text-white font-sans font-bold text-sm tracking-[0.18em] uppercase px-8 py-4 hover:bg-acid hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? 'Invio in corso…' : 'Richiedi una consulenza gratuita'}
              </button>

              <p id="main-form-status" role="alert" aria-live="assertive" className="text-red-700 text-sm font-sans font-semibold min-h-5">{submitError}</p>
              <p id="main-form-privacy" className="text-[#666] text-sm font-sans leading-relaxed">
                Inviando il modulo dichiari di aver letto la{' '}
                <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">Privacy Policy</a>.
              </p>
              <AudienceNotice tone="light" />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
