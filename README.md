# Musterausbau – prototyp strony (Trockenbau · Akustikbau · Spanndecken)

Statyczny prototyp bez frameworków i bez etapu budowania (build). Gotowy pod GitHub Pages —
wystarczy wgrać zawartość tego folderu do repozytorium i włączyć Pages dla brancha `main` (root).

## Struktura

- `index.html` — strona główna (wspólna): o firmie, dane kontaktowe, kafle prowadzące do 2 działów.
- `spanndecken.html` — dział "Sufity napinane" (Spanndecken).
- `trockenbau-akustikbau.html` — dział "Trockenbau & Akustikbau" (ścianki, sufity podwieszane, akustyka).
- `impressum.html`, `datenschutz.html`, `agb.html`, `widerruf.html` — podstrony prawne (realne pliki, nie hash-routing).
- `assets/style.css` — wspólny arkusz stylów (motyw Dunkel/dark, ustalony na tym etapie).
- `assets/site.js` — wspólna logika: przełącznik języka DE/PL/EN, menu mobilne, lightbox galerii, baner cookie, animacje wejścia, formularz (na razie tylko atrapa).

## Języki

Niemiecki (DE) jest językiem domyślnym zapisanym wprost w HTML. Polski (PL) i angielski (EN) są
zdefiniowane jako obiekty JS `PL` / `EN` w `<script>` na końcu każdej strony, tuż przed
`assets/site.js`. Przełącznik w pasku prototypu zapamiętuje wybór w `localStorage`.

## Do zrobienia przed publikacją produkcyjną

- Zastąpić placeholdery: nazwa firmy (obecnie „MUSTERAUSBAU”), adres, telefon, e-mail, dane
  rejestrowe w Impressum.
- Prawdziwe zdjęcia realizacji w miejsce kafelków-atrap w galeriach.
- Podłączyć wysyłkę formularza kontaktowego (np. Formspree / Web3Forms / własny backend).
- Weryfikacja prawna treści Impressum / Datenschutz / AGB / Widerrufsbelehrung (są oznaczone
  banerem ostrzegawczym jako niesprawdzone).
- Usunąć pasek prototypu (`#protobar`) z każdej strony.
- Rozważyć hosting z hasłem (Netlify / Cloudflare Pages) na czas prac, jeśli prototyp nie ma być
  jawnie dostępny publicznie — GitHub Pages jest zawsze publiczny (poza GitHub Enterprise Cloud).
