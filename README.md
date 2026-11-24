# Weekly Family Meal Plan (Next.js)

A week of nutritious Indian meals. Tap any meal card to open its recipe.

## Run it
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start   # production build
```

## Structure
- `app/page.js` – day tabs, meal cards and recipe view (client component)
- `app/data/meals.js` – all meals, ingredients and steps (edit here to change recipes)
- `app/globals.css` – styling (large fonts, card layout, recipe sheet)
- `app/layout.js` – root layout and metadata
