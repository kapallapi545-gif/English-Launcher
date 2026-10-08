# English Launcher — Liquid Glass

Launcher / słownik angielski w stylistyce **liquid glass**. Siatka kafelków
z angielskimi słowami, wyszukiwarka i panel szczegółów po kliknięciu —
z czasownikami nieregularnymi, nieregularną liczbą mnogą i stopniami
wyższymi.

Bez frameworków, bez buildu: `index.html` + `style.css` + `app.js` + dane.

## Start

```
Start-English.cmd
```

Skrypt otwiera launcher w trybie aplikacji (Chrome/Edge `--app`, czyli okno
bez adresu i zakładek). Jak nie ma Chrome/Edge — otwiera w domyślnej
przeglądarce. Można też po prostu dwukliknąć `index.html`.

Opcjonalnie lokalny serwer (opcjonalne, do testów):

```
node serve.mjs 8173      ->  http://localhost:8173/
```

## Co potrafi

| Funkcja | Opis |
|---|---|
| Wbudowany słownik | ~280 słów: ~120 czasowników, ~70 rzeczowników, ~40 przymiotników, reszta to słowa regularne |
| Formy nieregularne | czasowniki (baza / 3 os. / -ing / past / past participle + Future, Perfect, strona bierna), liczba mnoga (`child → children`), stopień wyższy (`good → better → best`) |
| Wyszukiwarka | po angielsku, **po każdej formie** (`went` → *go*, `children` → *child*, `better` → *good*) i **po tłumaczeniu polskim** (`iść` → *go*, `dziecko` → *child*) |
| Wymowa | Web Speech API — przycisk przy słowie, przy każdej formie i przy każdym przykładzie |
| Online | dla słów spoza pakietu dociąga definicje / synonimy / antonimy / IPA z [dictionaryapi.dev](https://dictionaryapi.dev), cache w `localStorage` (limit 450 zapytań/h) |
| Ulubione | gwiazdka na kafelku, osobny widok „Ulubione” |
| Własne słowa | formularz „Dodaj” — z własnymi formami nieregularnymi, zapis w `localStorage` |
| Filtry | część mowy · częstotliwość (rdzeń / częste / rzadsze) · „tylko nieregularne” · szyna liter A–Z |
| Skróty | `/` wyszukiwarka · strzałki nawigacja siatką · `Enter` otwórz · `Esc` zamknij / wyczyść · `F` ulubione |

## Pliki

| Plik / katalog | Opis |
|---|---|
| `index.html` | szkielet interfejsu |
| `style.css` | liquid glass (backdrop-filter, dyspersja na krawędzi, plamy w tle, ziarno) |
| `app.js` | logika: wyszukiwarka, filtry, panel słowa, TTS, API, localStorage |
| `data/lexicon.js` | dane w zwartej formie `base\|past\|pp\|3rd\|ing\|pl\|IPA\|example` + parser |
| `Start-English.cmd` | uruchomienie w trybie aplikacji |
| `serve.mjs` | opcjonalny serwer statyczny do testów |

## Jak dopisać słowo do pakietu

`data/lexicon.js` — dopisz linię w odpowiedniej sekcji:

```
verbs      base|past|pp|3 os.|-ing|pl|IPA|przykład
nouns      singular|plural|PL|IPA|przykład      (plural = — gdy brak liczby mnogiej)
adjectives base|comparative|superlative|PL|IPA|przykład
extra      słowo|poS|PL|IPA|definicja EN|przykład|tier (1-3)
```

Warianty formy rozdzielaj `/` — np. `burnt/burned`. Kolejność w sekcji
`verbs`/`nouns`/`adjectives` decyduje o częstotliwości (im wyżej, tym
częstsze), więc nowe słowa dopisuj na końcu.

## Uwagi

- Bez internetu działa wszystko poza dociąganiem definicji — wbudowany
  pakiet ma komplet form.
- Słowa z localStorage (`ew.favs`, `ew.custom`, `ew.cache`) można wyczyścić
  w DevTools → Application → Local Storage.
- Część mowy dla słów wbudowanych jest ustalana z pakietu, nie z API —
  `begin` w API zaczyna się od rzeczownika i psułoby dane o odmianie.