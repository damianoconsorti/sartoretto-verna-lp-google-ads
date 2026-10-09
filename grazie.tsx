import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import ThankYou from './components/ThankYou';
import { consumePendingLead } from './lib/leadConversion';
import { trackLeadConversion } from './lib/tracking';

// La conversione Google Ads parte qui, una sola volta, e solo dopo un invio riuscito (label in lib/tracking.ts, invariata).
const submittedForm = consumePendingLead();
if (submittedForm) trackLeadConversion(submittedForm);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThankYou />
  </React.StrictMode>
);
