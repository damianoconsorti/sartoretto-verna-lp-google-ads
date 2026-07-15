# Guida Elementor Ibrida e Modificabile

## Obiettivo

Questa versione e` pensata per essere:

- modificabile dentro Elementor
- responsive su desktop, tablet e mobile
- fedele al look della LP originale
- compatibile con un form reale Elementor Pro o Contact Form 7

Non usa un singolo widget HTML per tutta la pagina. Invece divide la landing in sezioni Elementor vere.

## Logica consigliata

- `Header`: sezione Elementor
- `Hero`: 3 container/colonne modificabili
- `Statistiche`: contatori o heading
- `Perche noi`: heading + text + icon list + cards
- `Metodo`: timeline costruita con container
- `Progetti`: cards immagini
- `Contatti`: colonna testo + colonna form Elementor
- `Footer`: testo e link

## CSS da usare

Incolla il file:

- `elementor-hybrid-styles.css`

in:

- Elementor > Impostazioni sito > CSS personalizzato

oppure nel CSS personalizzato della singola pagina.

## Struttura pagina

## 1. Header

### Sezione

- 1 container orizzontale
- classe: `sv-header-bar`

### Dentro

- widget immagine logo
- widget bottone CTA

### Al bottone

- classe: `sv-btn sv-btn-acid`
- link anchor: `#contatti`

## 2. Hero

### Sezione principale

- 1 container full width
- classe: `sv-hero-editable`

### Titolo overlay

- aggiungi un container interno
- classe: `sv-hero-copy`
- dentro:
  - heading principale
  - text editor per sottotitolo

### Griglia hero

- aggiungi un container con 3 colonne
- classe: `sv-hero-grid-editable`

### Ogni colonna hero

- classe: `sv-hero-panel`
- imposta immagine di sfondo da Elementor
- aggiungi overlay sfondo nero circa 50%

### Dentro ogni colonna

- badge piccolo
- heading
- testo descrittivo
- bottone

### Varianti colore colonna

- prima colonna: `sv-acid-panel`
- seconda colonna: `sv-cyan-panel`
- terza colonna: `sv-magenta-panel`

## 3. Statistiche

### Sezione

- container con 4 colonne desktop, 2 tablet, 1 mobile
- classe: `sv-stats-section`

### Ogni stat

- container singolo
- classe: `sv-stat-card`
- dentro:
  - heading numero
  - text editor label

## 4. Sezione Perche noi

### Sezione

- 2 colonne
- classe: `sv-why-section`

### Colonna sinistra

- badge: classe `sv-badge`
- heading
- due paragrafi
- icon list

### Colonna destra

- 3 container verticali
- classe comune: `sv-service-box`
- varianti:
  - `sv-service-cyan`
  - `sv-service-magenta`
  - `sv-service-acid`

## 5. Metodo

### Sezione

- container verticale
- classe: `sv-method-section`

### Header sezione

- container orizzontale
- classe: `sv-method-head`

### Timeline

- 5 righe
- ogni riga classe: `sv-timeline-row`

### Dentro ogni riga

- colonna numero: classe `sv-timeline-number`
- colonna contenuto: classe `sv-timeline-content`

Su tablet/mobile la timeline collassa in verticale automaticamente.

## 6. Progetti

### Sezione

- classe: `sv-projects-section`

### Griglia

- 3 card desktop
- 2 tablet
- 1 mobile

### Ogni card

- classe: `sv-project-card-editable`
- immagine come background o widget immagine
- badge categoria
- titolo progetto
- localita

## 7. Contatti

### Sezione

- 2 colonne
- classe: `sv-contact-section`

### Colonna sinistra

- heading
- testo
- bonus card con classe `sv-bonus-card`

### Colonna destra

Se usi Elementor Pro:

- widget `Form`
- classe form: `sv-real-form`

Se usi Contact Form 7:

- shortcode dentro widget shortcode
- wrapper classe: `sv-real-form`

## 8. Footer

### Sezione

- classe: `sv-footer-editable`

### Dentro

- testo azienda
- link privacy/cookie/termini
- copyright

## Classi utili rapide

- `sv-heading-xl`
- `sv-heading-lg`
- `sv-dark-section`
- `sv-light-section`
- `sv-btn`
- `sv-btn-acid`
- `sv-btn-outline`
- `sv-mono-label`

## Form Elementor consigliato

Campi:

1. Nome e Cognome
2. Farmacia / Citta
3. Email
4. Telefono
5. Select "Di cosa hai bisogno?"
6. Messaggio

### Stile

Al widget assegna:

- classe: `sv-real-form`

### Azioni dopo invio

Puoi configurare:

- email
- redirect
- webhook
- mailchimp
- CRM
- submit multiplo

## Responsive

Questa versione e` pensata cosi:

- desktop: layout vicino all'originale
- tablet: stacked dove serve
- mobile: una colonna, testi leggibili, CTA piene

## Consiglio pratico

Se vuoi lavorare bene in Elementor:

- usa questa guida per la struttura
- usa `elementor-hybrid-styles.css` per il look
- usa i contenuti del file `elementor-exact-embed.html` solo come riferimento testuale e visivo

Il risultato sara` molto piu facile da aggiornare rispetto al blocco HTML unico.
