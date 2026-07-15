# Guida Import in WordPress Elementor

## Obiettivo

Se vuoi la landing **quasi identica** a quella generata in React/AI Studio, il metodo migliore non e` ricostruirla solo con i widget nativi di Elementor.

Il percorso consigliato e` questo:

1. Crei una pagina WordPress vuota con template full width o Elementor Canvas.
2. Inserisci **un solo widget HTML** principale.
3. Incolli il contenuto di `elementor-exact-embed.html`.
4. Incolli `elementor-custom-styles.css` nel CSS personalizzato della pagina o del sito.
5. Incolli `elementor-custom-code.js` in Elementor Custom Code oppure nel footer del tema.

Questo approccio mantiene:

- struttura visiva
- scroll fluido
- hero a 3 colonne
- cards/statistiche
- timeline
- portfolio
- comportamento del form demo

## File del kit

- `elementor-exact-embed.html`
  Markup completo da incollare in un widget HTML.
- `elementor-custom-styles.css`
  CSS completo per replicare il look.
- `elementor-custom-code.js`
  JS per scroll, click hero e stato "richiesta ricevuta".
- `hero-section-elementor.json`
  Bozza importabile per la sola hero in modalita` nativa Elementor.
- `sartoretto-verna-full-page.json`
  Bozza base per una ricostruzione nativa Elementor, meno fedele del kit HTML.

## Procedura consigliata

### 1. Crea la pagina

- Vai in WordPress > Pagine > Nuova pagina
- Titolo: `Sartoretto Verna LP`
- Template: `Elementor Canvas` oppure `Full Width`
- Apri con Elementor

### 2. Aggiungi il markup

- Trascina un widget `HTML`
- Apri `elementor-exact-embed.html`
- Copia tutto il contenuto
- Incollalo nel widget HTML

### 3. Aggiungi il CSS

Opzione A, consigliata:

- Elementor > Impostazioni sito > CSS personalizzato
- Incolla `elementor-custom-styles.css`

Opzione B:

- Avanzato > CSS personalizzato nella singola pagina

## 4. Aggiungi il JS

Se hai Elementor Pro:

- Elementor > Custom Code
- Posizione: `Body End`
- Incolla `elementor-custom-code.js`

Se non hai Elementor Pro:

- Usa un plugin tipo `WPCode` o `Code Snippets`
- Inserisci lo script nel footer

## 5. Impostazioni pagina importanti

- Disattiva titolo pagina
- Disattiva sidebar
- Imposta larghezza contenuto full width
- Rimuovi margini top del tema se presenti
- Se il tema aggiunge header/footer, usa `Elementor Canvas`

## 6. Font e immagini

Per essere davvero vicina all'originale:

- Font consigliati: `Inter` e `JetBrains Mono`
- Caricali via Elementor Custom Fonts oppure Google Fonts alternative
- Sostituisci il logo remoto con il logo WordPress media library
- Sostituisci le immagini `picsum.photos` con immagini reali del brand

## 7. Limiti reali

`Identica al pixel` dentro Elementor e` difficile se usi solo widget nativi, perche':

- il progetto originale usa React
- alcune animazioni sono custom
- il form e` un form demo, non connesso a un backend reale

Per questo il kit HTML/CSS/JS e` il modo piu fedele.

## 8. Se vuoi versione 100% WordPress

Possiamo fare anche il passo successivo:

1. sostituire il form demo con Elementor Form o Contact Form 7
2. collegare invio email/CRM/WhatsApp
3. convertire le immagini in asset caricati su WordPress
4. rifinire header mobile e responsive direttamente nel builder

## 9. Uso dei JSON allegati

I file JSON presenti servono come supporto rapido, ma **non sono la strada migliore per avere una copia identica**.

- `hero-section-elementor.json`: utile per importare una base hero
- `sartoretto-verna-full-page.json`: utile come blueprint iniziale

Se l'obiettivo e` fedelta` visiva, usa il kit `HTML + CSS + JS`.

## 10. Se vuoi una pagina modificabile in Elementor

Usa invece questi file:

- `elementor-hybrid-guide.md`
- `elementor-hybrid-styles.css`

Questa variante e` meno rigida del blocco HTML unico e ti permette di:

- cambiare testi e immagini dentro Elementor
- usare un vero form configurabile
- mantenere un layout responsive per desktop, tablet e mobile
