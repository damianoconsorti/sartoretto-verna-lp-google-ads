<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/02cb4741-1a27-45a6-8f10-8621bdc27ee3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Varianti Google Ads

La pagina root continua a funzionare su `https://progetta.sartorettoverna.it/`.

Per evitare 404 sui refresh diretti di GitHub Pages, le tre varianti di intent condividono gli stessi componenti e usano un parametro query stabile:

- Progettazione/restyling: `/?intent=progettazione`
- Arredi e mobili: `/?intent=arredo`
- Ristrutturazione: `/?intent=ristrutturazione`

I parametri UTM e gli identificatori Google Ads (`gclid`, `wbraid`, `gbraid`) vengono conservati nella sessione e inviati insieme a entrambi i form.
