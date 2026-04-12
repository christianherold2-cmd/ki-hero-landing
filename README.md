# KI-Hero Landing Page

Statische Landing Page für [ki-hero-service.de](https://ki-hero-service.de).

## Preise ändern

Öffne `script.js` und ändere die Werte im `PREISE` Objekt ganz oben:

```js
const PREISE = {
  einrichtung: 499,        // Einmalige Einrichtungsgebühr in €
  monatlich: 99,           // Monatliche Software-Gebühr in €
  proMinute: 0.15,         // Preis pro Telefonie-Minute in €
  avgMinutenProAnruf: 2.5, // Durchschnittliche Minuten pro Anruf
  mitarbeiterKosten: 2000, // Kosten eines Mitarbeiters für Vergleich
};
```

## Deployment
Via Coolify (Dockerfile).
