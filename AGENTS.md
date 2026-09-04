Ich baue meine Portfolio-Seite auf j-jessen.de. Die Infrastruktur steht bereits
komplett, es geht ab jetzt ausschließlich um die eigentliche Seite.

## Zu mir
FIAE-Azubi. Ich lerne noch, erklär mir also gerne, was du tust und warum —
aber ohne Grundlagen-Vorträge zu Dingen, die ich offensichtlich schon kenne.
Antworte auf Deutsch, technische Begriffe auf Englisch. Kommentare im Code und
Anweisungen (Befehle, Pfade) immer auf Englisch und klein geschrieben. Knapp und direkt, keine
Schmeicheleien.

Kommentare im Code sollen sich nicht von meinen unterscheiden lassen: kurz,
eine Zeile, keine Erklärtexte. Keine Apostrophe (dont statt don't), keine
Gedankenstriche, keine Backticks, keine Listen oder Absätze. Namen in normalen
Anführungszeichen ("data-bs-theme"). Abschnittsüberschriften in CSS als
mehrzeiliger /* */ Block mit Bindestrich-Linien, in JS als
// ---------- name ----------, sonst einzeilig. Kommentare nur da, wo
etwas nicht offensichtlich ist, nicht über jedem Block. Wenn ich etwas falsch verstanden habe oder ein Ansatz Unsinn
ist, sag es.

## Umgebung
- Node.js 24, npm (aktuelle Version)
- Frameworks/Libraries: bootstrap 5.3, anime.js 4 (kein jQuery, vanilla JS)
- Editor: Zed

## Projektstruktur
j-jessen/
├── public/ <- alles hier wird ausgeliefert
│ ├── index.html
│ ├── datenschutz.html
│ ├── _headers <- Security-Header, keine Dateiendung
│ ├── css/
│ │ ├── bootstrap-overrides.css <- Farbschema, light/dark über data-bs-theme
│ │ ├── style.css <- eigene Styles
│ │ └── datenschutz.css
│ ├── js/
│ │ ├── theme.js <- setzt data-bs-theme vor dem ersten Paint, ohne defer
│ │ └── main.js
│ └── vendor/ <- heruntergeladene Libraries, nicht anfassen
│   ├── bootstrap/
│   └── anime/
├── wrangler.jsonc
├── package.json
├── .npmrc
└── .gitignore


## Hosting und Deployment
Cloudflare Workers mit Static Assets. Kein Backend, kein Worker-Code, kein
Build-Step. `public/` wird 1:1 ausgeliefert.

- `npx wrangler dev`     -> lokal testen (Beenden mit Taste `x`, nicht Strg+C)
- `npx wrangler deploy`  -> live

## Harte Vorgaben — bitte einhalten und mich warnen, wenn etwas dagegen verstößt
**Content Security Policy.** In `public/_headers` ist eine strikte CSP gesetzt
(`default-src 'self'`, kein `unsafe-inline`). Daraus folgt:
- Keine `<style>`-Blöcke im HTML, keine `style="..."`-Attribute
- Keine `<script>`-Blöcke im HTML, keine `onclick="..."`-Attribute
- CSS und JS immer in eigene Dateien, per `<link>` bzw. `<script src="">`
- Kein `eval()`, keine inline Event-Handler
Falls du die CSP für etwas erweitern musst, sag mir das explizit statt sie
stillschweigend aufzuweichen.

**Alles selbst ausliefern.** Keine CDN-Links, keine Google Fonts, keine
externen Skripte oder Stylesheets. Schriften und Libraries werden
heruntergeladen und liegen in `public/`. Grund ist einerseits die CSP,
andererseits DSGVO (fremde Server sehen sonst die IP meiner Besucher).

**npm zurückhaltend einsetzen.** In der `.npmrc` stehen `min-release-age=7`
und `strict-allow-scripts=true`. Neue Pakete mit Install-Scripts lassen die
Installation abbrechen, bis ich sie mit `npm approve-scripts <pkg>` freigebe.
Frag mich, bevor du irgendeine Dependency hinzufügst — auch dev-only. Für
Frontend-Libraries (z.B. Bootstrap, anime.js) will ich die fertigen Dateien
von Hand einbinden statt über npm.

**Nicht anfassen:** `wrangler.jsonc` (insbesondere `compatibility_date` und den
`routes`-Block), `.npmrc`, `_headers` ohne Rücksprache. Auch keine Änderungen
an DNS oder Cloudflare-Einstellungen vorschlagen — das ist alles fertig
konfiguriert.

**Inhaltliche Grenze:** Die Seite hat bewusst kein Impressum, weil sie rein
privat bleibt. Deshalb: keine Leistungsangebote, keine Preise, kein
"Beauftragen Sie mich", keine Affiliate-Links, keine Werbung. Projekte zeigen
und beschreiben ist in Ordnung, ebenso ein Lebenslauf.

**Sonstiges:** UTF-8, `lang="de"`, keine Cookies, kein Tracking, kein
Kontaktformular (stattdessen `mailto:kontakt@j-jessen.de`).
