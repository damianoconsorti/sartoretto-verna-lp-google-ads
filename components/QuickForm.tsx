import React, { FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { buildAttribution, isValidEmail, PRIVACY_URL, submitLead } from '../lib/forms';
import { trackLeadConversion } from '../lib/tracking';
import CallButton from './CallButton';
import AudienceNotice from './AudienceNotice';

const ease = [0.22, 1, 0.36, 1] as const;
const ZAPIER_URL = import.meta.env.VITE_QUICK_FORM_ENDPOINT || 'https://hooks.zapier.com/hooks/catch/1977593/44jzx6p/';

interface QuickFormState {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
}

type QuickField = keyof QuickFormState;
// 'pharmacy' = conferma "Gestisco una farmacia": controllo solo lato client, NON fa parte del payload inviato.
type QuickErrors = Partial<Record<QuickField | 'pharmacy', string>>;

const empty: QuickFormState = { nome: '', cognome: '', email: '', telefono: '' };

const inputCls =
  'min-h-11 bg-white border text-[#0a0a0a] text-base font-sans font-medium px-3 py-2.5 w-full rounded-none outline-none transition-colors duration-200 placeholder:text-[#707070] placeholder:font-light focus-visible:border-acid focus-visible:ring-2 focus-visible:ring-acid/70';

const fieldMeta: Array<{ key: QuickField; label: string; type: string; autoComplete: string }> = [
  { key: 'nome', label: 'Nome', type: 'text', autoComplete: 'given-name' },
  { key: 'cognome', label: 'Cognome', type: 'text', autoComplete: 'family-name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'telefono', label: 'Telefono', type: 'tel', autoComplete: 'tel' },
];

function validate(form: QuickFormState, isPharmacy: boolean): QuickErrors {
  const errors: QuickErrors = {};
  if (!form.nome.trim()) errors.nome = 'Inserisci il nome.';
  if (!form.cognome.trim()) errors.cognome = 'Inserisci il cognome.';
  if (!form.email.trim()) errors.email = 'Inserisci l’email.';
  else if (!isValidEmail(form.email)) errors.email = 'Inserisci un indirizzo email valido.';
  if (!form.telefono.trim()) errors.telefono = 'Inserisci il telefono.';
  if (!isPharmacy) errors.pharmacy = 'Conferma di gestire una farmacia per inviare la richiesta.';
  return errors;
}

export default function QuickForm() {
  const [form, setForm] = useState<QuickFormState>(empty);
  const [errors, setErrors] = useState<QuickErrors>({});
  const [isPharmacy, setIsPharmacy] = useState(false);
  const pharmacyRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const successTrackedRef = useRef(false);
  const inputRefs = useRef<Partial<Record<QuickField, HTMLInputElement | null>>>({});

  function update(key: QuickField, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validate(form, isPharmacy);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitError('Controlla i campi evidenziati prima di inviare.');
      const firstInvalid = fieldMeta.find(({ key }) => nextErrors[key]);
      if (firstInvalid) requestAnimationFrame(() => inputRefs.current[firstInvalid.key]?.focus());
      else requestAnimationFrame(() => pharmacyRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setSending(true);
    setSubmitError(null);

    try {
      const payload: Record<string, string> = {
        nome: form.nome.trim(),
        cognome: form.cognome.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        origine: 'quick-form-google-ads',
        ...buildAttribution('quick_form'),
      };

      await submitLead(ZAPIER_URL, payload);
      if (!successTrackedRef.current) {
        trackLeadConversion('quick_form');
        successTrackedRef.current = true;
      }
      setForm(empty);
      setSent(true);
    } catch {
      setSubmitError('Invio non riuscito. Verifica la connessione e riprova.');
    } finally {
      submittingRef.current = false;
      setSending(false);
    }
  }

  return (
    <section id="quick-form" className="bg-[#111111] border-b border-white/10 scroll-mt-[120px] md:scroll-mt-[100px]">
      <div className="px-5 md:px-14 lg:px-24 py-4 md:py-6">
        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-3" role="status" tabIndex={-1}>
            <p className="text-acid font-sans font-semibold text-base">Richiesta inviata.</p>
            <p className="text-white/75 text-sm mt-1">Ti ricontatteremo appena possibile, normalmente entro 24 ore lavorative.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.8 }}
            onSubmit={handleSubmit}
            noValidate
            aria-describedby="quick-form-status quick-form-privacy"
            className="relative"
          >
            <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <CallButton location="quick_form" tone="dark" className="w-full sm:w-auto" />
              <p className="text-white/70 text-xs sm:text-sm">Oppure lasciaci i tuoi dati: ti ricontattiamo noi.</p>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-3 lg:gap-4">
              <p className="hidden xl:block text-white/70 text-xs tracking-[0.2em] uppercase font-sans font-semibold shrink-0 pt-3.5">
                Consulenza gratuita
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 gap-3">
                {fieldMeta.map(({ key, label, type, autoComplete }) => {
                  const id = `quick-${key}`;
                  const errorId = `${id}-error`;
                  return (
                    <div key={key} className="min-w-0">
                      <label htmlFor={id} className="sr-only">{label}</label>
                      <input
                        ref={(element) => { inputRefs.current[key] = element; }}
                        id={id}
                        name={key}
                        type={type}
                        required
                        autoComplete={autoComplete}
                        placeholder={`${label} *`}
                        value={form[key]}
                        onChange={(event) => update(key, event.target.value)}
                        aria-invalid={Boolean(errors[key])}
                        aria-describedby={errors[key] ? errorId : undefined}
                        className={`${inputCls} ${errors[key] ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'}`}
                      />
                      {errors[key] && <p id={errorId} className="mt-1 text-xs font-medium text-red-300">{errors[key]}</p>}
                    </div>
                  );
                })}
              </div>

              {/* Mobile: checkbox sopra il bottone. Da lg: bottone in riga con i campi, checkbox sulla riga sotto. */}
              <div className="flex flex-col gap-3 lg:contents">
                <div className="lg:order-last lg:basis-full">
                  <label htmlFor="quick-pharmacy" className="flex min-h-11 cursor-pointer items-start gap-3 text-sm font-medium text-white">
                    <input
                      ref={pharmacyRef}
                      id="quick-pharmacy"
                      type="checkbox"
                      required
                      checked={isPharmacy}
                      onChange={(event) => {
                        setIsPharmacy(event.target.checked);
                        if (errors.pharmacy) setErrors((previous) => ({ ...previous, pharmacy: undefined }));
                        if (submitError) setSubmitError(null);
                      }}
                      aria-invalid={Boolean(errors.pharmacy)}
                      aria-describedby={errors.pharmacy ? 'quick-pharmacy-error' : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-acid"
                    />
                    <span>Gestisco una farmacia <span aria-hidden="true">*</span></span>
                  </label>
                  {errors.pharmacy && <p id="quick-pharmacy-error" className="text-xs font-medium text-red-300">{errors.pharmacy}</p>}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="min-h-11 shrink-0 inline-flex items-center justify-center bg-acid text-dark font-sans font-bold text-xs md:text-sm tracking-[0.12em] uppercase px-5 py-3 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Invio in corso…' : 'Richiedi una consulenza gratuita'}
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
              <p id="quick-form-privacy" className="text-white/60 text-xs leading-relaxed">
                Inviando il modulo dichiari di aver letto la{' '}
                <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid">Privacy Policy</a>.
              </p>
              <p id="quick-form-status" role="alert" aria-live="assertive" className="text-red-300 text-xs font-semibold min-h-4">
                {submitError}
              </p>
            </div>
            <AudienceNotice tone="dark" className="mt-1" />
          </motion.form>
        )}
      </div>
    </section>
  );
}
