# Istruzioni Standard Per Replica Pagine Web In WordPress Con Elementor

## Scopo

Questo documento definisce lo standard da seguire quando si crea o si replica una pagina web in WordPress usando **Elementor**.

L'obiettivo non e` solo ottenere una pagina esteticamente corretta, ma una pagina che sia anche:

- modificabile in Elementor senza interventi sul codice
- responsive su desktop, tablet e mobile
- coerente nel design system
- strutturata in modo chiaro e mantenibile

## Regola fondamentale

Ogni volta che viene richiesta la creazione o replica di una pagina in Elementor, **devono sempre essere fornite tutte le informazioni necessarie per costruire ogni sezione senza ambiguita`**.

Non sono accettabili istruzioni vaghe come:

- "aggiungi un container con un titolo"
- "metti un po' di padding"
- "fai il bottone simile all'originale"

Le istruzioni devono invece indicare **tutti i parametri da inserire**.

## Vincoli obbligatori

Ogni pagina progettata con queste istruzioni deve rispettare sempre questi vincoli:

1. Deve essere costruita con elementi **modificabili in Elementor**.
2. Deve essere pensata in ottica **responsive-first**.
3. Deve prevedere settaggi distinti per:
   - desktop
   - tablet
   - mobile
4. Deve usare:
   - container
   - widget
   - classi CSS
   - spaziature
   - font
   - allineamenti
   - larghezze
   - min-height
   - position
   - z-index
   - background
   - bordi
   - overlay
   - link/anchor
   - eventuali interazioni
5. Se e` presente un form, questo deve essere:
   - reale
   - configurabile in Elementor o con shortcode
   - stilizzato ma non bloccato dentro un unico widget HTML

## Approccio corretto

Quando si costruisce una pagina in Elementor:

- evitare, se possibile, un unico widget HTML per tutta la pagina
- preferire una struttura fatta di container e widget nativi Elementor
- usare CSS personalizzato solo per styling avanzato, non per sostituire l'editor
- mantenere ogni testo, immagine, bottone e form modificabile dal pannello Elementor

## Livello di dettaglio richiesto

Per **ogni sezione** devono essere specificati:

- nome sezione
- obiettivo della sezione
- struttura gerarchica dei container
- direzione di ogni container
- larghezza dei container
- gap tra elementi
- padding per desktop, tablet e mobile
- margini per desktop, tablet e mobile
- min-height se necessario
- background
- overlay
- bordi
- radius
- ombre
- posizione
- z-index
- widget da inserire
- ordine dei widget
- contenuti testuali
- font family
- font size
- font weight
- line-height
- letter-spacing
- text-transform
- colori
- allineamento
- comportamento responsive
- classi CSS da assegnare
- link o anchor dei pulsanti
- eventuali note di comportamento

## Formato obbligatorio delle istruzioni

Ogni pagina deve essere descritta usando questa struttura.

---

## 1. Informazioni generali pagina

Per ogni pagina devono essere indicate:

- nome pagina
- obiettivo della pagina
- tipo pagina
  - landing page
  - pagina servizio
  - homepage
  - contatti
  - portfolio
- builder utilizzato: `Elementor`
- template pagina WordPress:
  - `Elementor Canvas`
  - `Elementor Full Width`
  - altro template specifico
- eventuali plugin coinvolti:
  - Elementor Pro
  - Contact Form 7
  - WPCode
  - altro

### Impostazioni globali obbligatorie

Specificare sempre:

- larghezza contenuto globale
- eventuale max-width globale
- font principali
- palette colori
- stile pulsanti
- stile form
- breakpoint di riferimento

### Esempio minimo richiesto

- Template: `Elementor Canvas`
- Larghezza globale: `Full Width`
- Max width interno contenuto: `1280px`
- Font titolo: `Inter`
- Font tecnico/label: `JetBrains Mono`
- Desktop: `>= 1025px`
- Tablet: `768px - 1024px`
- Mobile: `<= 767px`

---

## 2. Regole per i container

Per ogni container devono sempre essere indicati **tutti** i seguenti parametri.

### Identificazione

- nome container
- livello gerarchico
  - sezione principale
  - sotto-container
  - container colonna
  - wrapper interno
- classe CSS
- eventuale ID anchor

### Layout

- content width
  - boxed
  - full width
- width
  - percentuale
  - px
  - auto
- min-height
- direction
  - row
  - column
- justify-content
- align-items
- align-content
- wrap
- gap

### Spaziature

Indicare sempre separatamente:

- padding top/right/bottom/left desktop
- padding top/right/bottom/left tablet
- padding top/right/bottom/left mobile
- margin top/right/bottom/left desktop
- margin top/right/bottom/left tablet
- margin top/right/bottom/left mobile

### Stile visivo

- background color
- background image
- background repeat
- background size
- background position
- overlay
- border
- border radius
- box shadow
- opacity

### Posizionamento

- position
  - default
  - relative
  - absolute
  - sticky
  - fixed
- top/right/bottom/left se usati
- z-index

### Responsive

Specificare sempre:

- cosa succede su tablet
- cosa succede su mobile
- se cambia direzione
- se cambia larghezza
- se cambia spaziatura
- se alcuni elementi vengono spostati o nascosti

---

## 3. Regole per i widget

Per ogni widget devono essere specificati tutti i parametri utili.

### Identificazione

- tipo widget
  - titolo
  - editor di testo
  - immagine
  - pulsante
  - form
  - icona
  - lista icone
  - contatore
  - shortcode
  - video
  - altro
- posizione nel container
- classe CSS widget

### Contenuto

- testo esatto da inserire
- eventuale HTML inline ammesso
- immagine da usare
- alt text
- URL link
- anchor link

### Tipografia

- font family
- font size desktop
- font size tablet
- font size mobile
- font weight
- line-height
- letter-spacing
- text-transform
- text color
- text align

### Box model widget

- padding desktop/tablet/mobile
- margin desktop/tablet/mobile
- width
- max-width

### Stile specifico

- background
- border
- border radius
- shadow
- hover state
- transition

### Responsive

Indicare:

- allineamento desktop/tablet/mobile
- larghezza desktop/tablet/mobile
- comportamento al resize

---

## 4. Regole per i pulsanti

Ogni bottone deve essere definito con:

- testo esatto
- link esatto
- eventuale anchor
- allineamento
- padding desktop/tablet/mobile
- font family
- font size
- font weight
- letter-spacing
- text-transform
- colore testo
- background colore
- border
- border radius
- hover background
- hover color
- hover border
- transition
- width
  - auto
  - full width

### Esempio

- Testo: `Richiedi Consulenza`
- Link: `#contatti`
- Font: `Inter`
- Weight: `800`
- Size: `13px`
- Letter spacing: `0.12em`
- Text transform: `uppercase`
- Padding desktop: `16 22 16 22`
- Padding tablet: `14 20 14 20`
- Padding mobile: `12 16 12 16`
- Background: `#ccff00`
- Colore testo: `#000000`
- Hover background: `#ffffff`

---

## 5. Regole per immagini e media

Per ogni immagine vanno sempre indicati:

- tipo uso
  - logo
  - hero
  - card progetto
  - icona
  - immagine contenuto
- origine immagine
- alt text
- dimensione desiderata
- object fit
- object position
- width desktop/tablet/mobile
- max-width
- eventuali filtri
- eventuali overlay
- eventuale comportamento hover

---

## 6. Regole per i form

Se la pagina contiene un form, le istruzioni devono specificare:

- tipo di form
  - Elementor Pro Form
  - Contact Form 7
  - altro
- campi presenti
- ordine dei campi
- label
- placeholder
- required o meno
- layout desktop
- layout tablet
- layout mobile
- stile dei campi
- stile del pulsante submit
- messaggi di successo
- azioni dopo invio
  - email
  - redirect
  - webhook
  - CRM

### Per ogni campo indicare

- tipo campo
- nome interno
- label
- placeholder
- required
- width desktop
- width tablet
- width mobile
- classe CSS se necessaria

### Esempio campi

1. Nome e Cognome
   - tipo: text
   - required: si
   - width desktop: 50%
   - width mobile: 100%
2. Email
   - tipo: email
   - required: si
3. Telefono
   - tipo: tel
   - required: si
4. Select servizio
   - tipo: select
   - required: si
5. Messaggio
   - tipo: textarea
   - required: no

---

## 7. Responsive obbligatorio

Ogni sezione e ogni widget devono essere progettati in modo responsive.

### Regole minime obbligatorie

- nessun testo deve uscire dal viewport
- nessuna immagine deve deformarsi
- nessun bottone deve risultare troppo piccolo da cliccare
- il form deve essere usabile anche su smartphone
- gli spazi bianchi devono restare equilibrati
- il layout desktop non deve essere semplicemente "schiacciato"

### Deve sempre essere indicato

Per desktop:

- numero colonne
- larghezze
- spaziature

Per tablet:

- se il layout resta a colonne o diventa stacked
- nuovi padding/margini
- riduzione titoli

Per mobile:

- layout preferibilmente a una colonna
- font ridotti ma leggibili
- CTA full width se utile
- gap verticali adeguati

### Checklist responsive obbligatoria

Per ogni pagina bisogna verificare:

1. Header leggibile su mobile
2. Hero leggibile senza tagli
3. Sezioni a colonne correttamente impilate
4. Form compilabile da smartphone
5. Immagini e cards non deformate
6. Footer ordinato anche su mobile

---

## 8. Regole per la modificabilita` in Elementor

Le pagine devono essere costruite in modo che il cliente o editor possa modificare:

- testi
- immagini
- link
- CTA
- form
- ordine dei contenuti, se ragionevole

### Non fare

- non bloccare tutto in un solo widget HTML, salvo casi eccezionali
- non inserire testi importanti direttamente in CSS
- non usare JS per contenuti che devono essere editabili
- non creare layout dipendenti da hack difficili da mantenere

### Fare

- usare widget nativi Elementor
- usare container chiari
- assegnare classi CSS ai blocchi
- usare CSS per stile, non per sostituire i contenuti

---

## 9. Template di consegna obbligatorio per ogni sezione

Ogni sezione deve essere documentata con questo schema.

## Nome Sezione

### Obiettivo

Descrivere in una frase a cosa serve la sezione.

### Container principale

- tipo:
- classe CSS:
- ID:
- direction desktop:
- direction tablet:
- direction mobile:
- width:
- min-height:
- justify-content:
- align-items:
- gap desktop:
- gap tablet:
- gap mobile:
- padding desktop:
- padding tablet:
- padding mobile:
- margin desktop:
- margin tablet:
- margin mobile:
- background:
- border:
- radius:
- shadow:
- position:
- z-index:

### Sotto-container

Ripetere lo stesso schema per ogni sotto-container.

### Widget

Per ogni widget:

- tipo widget:
- classe CSS:
- contenuto:
- font family:
- font size desktop:
- font size tablet:
- font size mobile:
- font weight:
- line-height:
- letter-spacing:
- text-transform:
- colore:
- align:
- width:
- padding:
- margin:
- background:
- border:
- hover:
- link:

### Responsive behavior

- desktop:
- tablet:
- mobile:

### Note operative

- eventuali dettagli extra
- eventuali dipendenze CSS
- eventuali limitazioni

---

## 10. Standard pratico da seguire sempre

Quando viene richiesta la replica di una pagina, la documentazione da fornire deve essere:

- precisa
- completa
- costruibile senza ipotesi
- divisa sezione per sezione
- utile sia per chi progetta sia per chi monta la pagina in Elementor

Se manca anche solo una delle seguenti informazioni, la consegna non e` completa:

- struttura container
- widget esatti
- spacing
- tipografia
- responsive
- modificabilita`
- stile pulsanti
- stile form

---

## 11. Formula finale obbligatoria

Ogni futura istruzione per pagine Elementor deve essere prodotta con questa logica:

1. Definisci le impostazioni globali
2. Definisci la struttura della pagina
3. Descrivi ogni sezione con tutti i parametri
4. Specifica desktop, tablet e mobile
5. Specifica cosa deve restare modificabile in Elementor
6. Specifica classi CSS e dipendenze
7. Non lasciare nulla implicito

Questo documento e` da considerare il riferimento standard per tutte le future repliche o creazioni di pagine WordPress con Elementor.
