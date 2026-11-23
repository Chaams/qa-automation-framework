# qa-automation-framework

Framework de **QA Automation** complet, pensé comme un lead : E2E (Playwright + Page Object Model, 3 navigateurs),
tests de contrat API, test d'un flux **Kafka**, tests de charge **k6** avec seuils, et pipeline **GitHub Actions**.

```bash
npm install && npx playwright install
npm test                    # E2E + API (cible : saucedemo.com et jsonplaceholder, sites publics de démo)
k6 run perf/load.k6.js      # charge, avec seuils p95 < 500 ms
docker compose up -d && npm run test:kafka   # flux événementiel (nécessite Docker)
```

| Dossier | Contenu |
|---|---|
| `pages/` | Page Objects (`LoginPage`, `CartPage`) |
| `tests/e2e` | Parcours utilisateur |
| `tests/api` | Contrats REST (statuts, schéma, création) |
| `tests/kafka` | Test « commande créée → facture émise » |
| `perf/` | Script k6 + seuils |
| `.github/workflows/ci.yml` | Pipeline : E2E/API puis performance |

> Adaptez `baseURL` (variable `BASE_URL`) et l'API cible à votre propre application.
