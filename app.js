/* ============================================================
   English Launcher — logika
   ------------------------------------------------------------
   Zestaw wbudowany (data/lexicon.js) + słowa dodane przez
   użytkownika + słowa pobrane z dictionaryapi.dev (cache
   w localStorage). Szukanie działa po: angielskim, każdej
   formie nieregularnej (went, children, better) i tłumaczeniu
   polskim.
   ============================================================ */

(() => {
  'use strict';

  /* ---------------- magazyn (localStorage) ---------------- */

  const LS = {
    favs: 'ew.favs',
    custom: 'ew.custom',
    cache: 'ew.cache',
    ui: 'ew.ui',
  };

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* pełny dysk */ }
    },
  };

  /* ---------------- pomocnicze ---------------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const escapeHtml = (s = '') => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  /** Małe litery + usunięcie polskich znaków (ł nie rozkłada się w NFD). */
  const norm = (s = '') => String(s)
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const posLabel = {
    verb: 'czasownik',
    noun: 'rzeczownik',
    adjective: 'przymiotnik',
    adverb: 'przysłówek',
    phrase: 'zwrot',
    interjection: 'wykrzyknik',
    expression: 'wyrażenie',
  };

  const posShort = {
    verb: 'verb', noun: 'noun', adjective: 'adj', adverb: 'adv',
    phrase: 'phrase', interjection: 'interj', expression: 'expr',
  };

  const TIER_LABEL = { 1: 'rdzeń', 2: 'częste', 3: 'rzadsze' };
  const TIER_HINT = {
    1: 'najczęstsze 1000 słów języka angielskiego',
    2: 'powyżej 1000 wystąpień w korpusie',
    3: 'poniżej 1000 wystąpień w korpusie',
  };

  const hashHue = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return h;
  };

  const firstForm = (form) => (form || '').split('/')[0].trim();

  const formRow = (label, value, irregular = false, speakable = true) => `
    <div class="form-row${irregular ? ' form-row--irr' : ''}">
      <span class="form-row__label">${irregular ? '⚡' : ''}${escapeHtml(label)}</span>
      <span class="form-row__value">
        ${escapeHtml(value)}
        ${speakable ? `<button class="speak-mini" type="button" data-speak="${escapeHtml(firstForm(value))}" title="Wymów">
          <svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>
        </button>` : ''}
      </span>
    </div>`;

  /* ---------------- dane ---------------- */

  const builtIn = window.LEXICON.words;

  const all = [];
  let byForm = new Map();

  function indexWords() {
    byForm = new Map();
    for (const w of all) {
      for (const f of (w.forms || [])) {
        const key = norm(f);
        if (key && !byForm.has(key)) byForm.set(key, w);
      }
    }
  }

  function build() {
    all.length = 0;
    all.push(...builtIn);

    /* Słowo dodane przez użytkownika ma pierwszeństwo przed
       wersją wbudowaną o tej samej nazwie. */
    for (const w of store.get(LS.custom, [])) {
      const i = all.findIndex(x => x.word.toLowerCase() === w.word.toLowerCase());
      if (i >= 0) all[i] = w; else all.push(w);
    }

    for (const [key, api] of Object.entries(store.get(LS.cache, {}))) {
      const existing = all.find(w => w.word.toLowerCase() === key);
      if (existing) existing.api = api;
      else {
        const w = makeRecord(key, api.pos || 'noun', '', api.ipa || '', '', 2);
        w.api = api;
        all.push(w);
      }
    }
    indexWords();
  }

  function makeRecord(word, pos, pl, ipa, ex, tier) {
    return {
      word, pos, pl: pl || '', ipa: ipa || '', ex: ex || '',
      tier: tier || 2, irregular: false,
      forms: [word], altForms: [],
    };
  }

  /* ---------------- stan UI ---------------- */

  const state = {
    q: '',
    pos: 'all',
    tier: 'all',
    irrOnly: false,
    favsOnly: false,
    letter: null,
    open: null,
    focusIndex: 0,
  };

  const ui = store.get(LS.ui, {});
  if (ui.pos) state.pos = ui.pos;
  if (ui.tier) state.tier = ui.tier;
  if (ui.irrOnly) state.irrOnly = true;

  const favs = new Set(store.get(LS.favs, []));

  const saveUi = () => store.set(LS.ui, { pos: state.pos, tier: state.tier, irrOnly: state.irrOnly });
  const saveFavs = () => store.set(LS.favs, [...favs]);

  /* ---------------- referencje DOM ---------------- */

  const el = {
    search: $('#search'),
    clear: $('#clearSearch'),
    grid: $('#grid'),
    empty: $('#emptyBox'),
    emptyLookup: $('#emptyLookup'),
    looking: $('#lookingBox'),
    title: $('#sectionTitle'),
    count: $('#resultCount'),
    posChips: $('#posChips'),
    tierChips: $('#tierChips'),
    irrOnly: $('#irrOnly'),
    rail: $('#rail'),
    favsBtn: $('#favsBtn'),
    favCount: $('#favCount'),
    randomBtn: $('#randomBtn'),
    addBtn: $('#addBtn'),
    statTotal: $('#statTotal'),
    statIrr: $('#statIrr'),
    statNet: $('#statNet'),
    detail: $('#detail'),
    detailWord: $('#detailWord'),
    detailIpa: $('#detailIpa'),
    detailPos: $('#detailPos'),
    detailIrr: $('#detailIrr'),
    detailPl: $('#detailPl'),
    detailBody: $('#detailBody'),
    detailStar: $('#detailStar'),
    detailClose: $('#detailClose'),
    speakWord: $('#speakWord'),
    modal: $('#addModal'),
    addForm: $('#addForm'),
    addClose: $('#addClose'),
    addCancel: $('#addCancel'),
    verbForms: $('#verbForms'),
    scrim: $('#scrim'),
  };

  /* ---------------- wyszukiwanie ---------------- */

  function scoreWord(w, q, qn) {
    const word = w.word.toLowerCase();
    if (word === q) return 1000;
    if (word.startsWith(q)) return 600 - word.length;

    let best = 0;
    for (const f of (w.altForms || [])) {
      if (f === '—') continue;
      const fl = f.toLowerCase();
      if (fl === q) best = Math.max(best, 560);
      else if (fl.startsWith(q)) best = Math.max(best, 460 - fl.length);
      else if (fl.includes(q)) best = Math.max(best, 300);
      // część formy ("won" w "swone")
      else if (q.length >= 3 && fl.includes(q)) best = Math.max(best, 260);
    }

    if (word.includes(q)) best = Math.max(best, 400 - word.length);

    if (best < 400 && norm(w.pl || '').includes(qn) && qn.length >= 2) best = Math.max(best, 220);
    if (best < 400 && norm(w.ex || '').includes(qn) && qn.length >= 4) best = Math.max(best, 120);
    if (best < 400 && norm(w.def || '').includes(qn) && qn.length >= 4) best = Math.max(best, 110);

    return best;
  }

  function currentResults() {
    const q = state.q.trim().toLowerCase();
    const qn = norm(state.q.trim());
    let list = all;

    if (state.favsOnly) list = list.filter(w => favs.has(w.word.toLowerCase()));
    if (state.pos !== 'all') list = list.filter(w => w.pos === state.pos);
    if (state.tier !== 'all') list = list.filter(w => String(w.tier) === state.tier);
    if (state.irrOnly) list = list.filter(w => w.irregular);
    if (state.letter) list = list.filter(w => w.word.toLowerCase().startsWith(state.letter));

    if (q) {
      return list
        .map(w => ({ w, s: scoreWord(w, q, qn) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s || a.w.word.localeCompare(b.w.word))
        .map(x => x.w);
    }

    return [...list].sort((a, b) => (a.tier - b.tier) || a.word.localeCompare(b.word, 'en'));
  }

  function sectionTitle() {
    if (state.q.trim()) return `Wyniki dla „${state.q.trim()}”`;
    if (state.favsOnly) return 'Ulubione';
    if (state.letter) return `Litera ${state.letter.toUpperCase()}`;
    if (state.pos !== 'all') return posLabel[state.pos] || 'Słowa';
    if (state.irrOnly) return 'Nieregularne formy';
    return 'Wszystkie słowa';
  }

  /* ---------------- render ---------------- */

  function tileHtml(w) {
    const q = state.q.trim();
    const word = q ? highlight(w.word, q) : escapeHtml(w.word);
    const key = w.word.toLowerCase();
    const hue = hashHue(w.word);
    const star = favs.has(key);

    return `<li class="tile${state.open === w ? ' is-open' : ''}" data-word="${escapeHtml(w.word)}">
      <button class="tile__hit" type="button" data-open="${escapeHtml(w.word)}" aria-label="Szczegóły: ${escapeHtml(w.word)}"></button>
      <div class="tile__top">
        <div class="tile__badge" style="background:linear-gradient(150deg, hsl(${hue} 78% 60%), hsl(${(hue + 42) % 360} 72% 45%))">${escapeHtml(w.word[0].toUpperCase())}</div>
      </div>
      <button class="tile__star${star ? ' is-on' : ''}" type="button" data-fav="${escapeHtml(w.word)}" title="${star ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}" aria-pressed="${star}">
        <svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/></svg>
        <span class="sr-only">${star ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}: ${escapeHtml(w.word)}</span>
      </button>
      <span class="tile__word">${word}</span>
      <span class="tile__pl">${escapeHtml(w.pl || '—')}</span>
      <span class="tile__foot">
        <span class="tile__pos">${posShort[w.pos] || w.pos}</span>
        ${w.irregular ? '<span class="tile__irr">⚡ niereg.</span>' : ''}
      </span>
    </li>`;
  }

  function highlight(text, q) {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return escapeHtml(text);
    return escapeHtml(text.slice(0, i))
      + '<mark>' + escapeHtml(text.slice(i, i + q.length)) + '</mark>'
      + escapeHtml(text.slice(i + q.length));
  }

  let visible = [];

  function render() {
    visible = currentResults();
    el.grid.innerHTML = visible.map(tileHtml).join('');
    el.title.textContent = sectionTitle();
    el.count.textContent = visible.length === 1 ? '1 słowo' : `${visible.length} słów`;
    el.empty.hidden = visible.length > 0;
    el.clear.hidden = !state.q;
    el.favCount.textContent = favs.size;
    el.favsBtn.setAttribute('aria-pressed', String(state.favsOnly));
    el.irrOnly.checked = state.irrOnly;
    renderRail();
    renderStats();
    syncChips();
  }

  function renderStats() {
    el.statTotal.textContent = `${all.length} słów`;
    el.statIrr.textContent = `${all.filter(w => w.irregular).length} z formami nieregularnymi`;
    el.statIrr.title = 'Liczba słów z nieregularną odmianą (czasowniki, liczba mnoga, stopień wyższy)';
  }

  function renderNet() {
    const on = navigator.onLine;
    el.statNet.textContent = on ? 'online' : 'offline';
    el.statNet.classList.toggle('is-online', on);
    el.statNet.classList.toggle('is-offline', !on);
  }

  function renderRail() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const pool = all.filter(w => (state.pos === 'all' || w.pos === state.pos)
      && (state.tier === 'all' || String(w.tier) === state.tier)
      && (!state.irrOnly || w.irregular));
    el.rail.innerHTML = [...letters].map(L => {
      const has = pool.some(w => w.word.toLowerCase().startsWith(L));
      const on = state.letter === L;
      return `<button class="rail__btn${on ? ' is-on' : ''}" type="button" data-letter="${L}" ${has ? '' : 'disabled'} title="${L.toUpperCase()}">${L}</button>`;
    }).join('');
  }

  /* ---------------- filtry ---------------- */

  const POS_CHIPS = [
    ['all', 'Wszystkie'],
    ['verb', 'Czasowniki'],
    ['noun', 'Rzeczowniki'],
    ['adjective', 'Przymiotniki'],
    ['adverb', 'Przysłówki'],
    ['phrase', 'Zwroty'],
  ];

  const TIER_CHIPS = [['all', 'Każda częstość'], ['1', 'Rdzeń 1000+'], ['2', 'Częste'], ['3', 'Rzadsze']];

  function buildChips() {
    el.posChips.innerHTML = POS_CHIPS
      .map(([v, l]) => `<button class="chip" type="button" data-pos="${v}">${l}</button>`).join('');
    el.tierChips.innerHTML = TIER_CHIPS
      .map(([v, l]) => `<button class="chip" type="button" data-tier="${v}" title="${TIER_HINT[v] || ''}">${l}</button>`).join('');
  }

  function syncChips() {
    $$('.chip[data-pos]', el.posChips).forEach(c => c.classList.toggle('is-on', c.dataset.pos === state.pos));
    $$('.chip[data-tier]', el.tierChips).forEach(c => c.classList.toggle('is-on', c.dataset.tier === state.tier));
  }

  /* ---------------- panel słowa ---------------- */

  const SPEAKER_ICON = `<svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>`;

  function verbSection(w) {
    const v = w.verb;
    if (!v) return '';

    const base = firstForm(v.base);
    const third = firstForm(v.third);
    // "bears" jest regularne (bear + s), "went" już nie
    const thirdRegular = [base + 's', base + 'es', base.replace(/y$/, 'ies')].includes(third);

    const rows = [
      ['Baza (infinitive)', v.base, false],
      ['3 os. sg.', v.third, !thirdRegular],
      ['-ing (gerund)', v.ing, firstForm(v.ing) !== base + 'ing'],
      ['Past', v.past, firstForm(v.past) !== base],
      ['Past participle', v.pp, firstForm(v.pp) !== base],
      ['Przyszłość', `will ${base}`, false],
      ['Present Perfect', `have / has ${firstForm(v.pp)}`, false],
      ['Strona bierna', `was / were ${firstForm(v.pp)}`, false],
    ].filter(r => r[1] && r[1] !== '—');

    const irregular = rows.filter(r => r[2]).length;

    return `<section class="block">
      <h3 class="block__title">Odmiena${irregular ? ` · ${irregular} formy nieregularne` : ''}</h3>
      <div class="forms">${rows.map(r => formRow(r[0], r[1], r[2])).join('')}</div>
    </section>`;
  }

  function nounSection(w) {
    const n = w.noun;
    if (!n) return '';
    const noPlural = n.plural === '—';
    return `<section class="block">
      <h3 class="block__title">Liczba mnoga</h3>
      <div class="forms">
        ${formRow('Singular', n.singular, false)}
        ${noPlural ? '' : formRow('Plural', n.plural, true)}
      </div>
      ${noPlural ? '<p class="note">Ta rzeczownik w angielskim nie ma liczby mnogiej — używamy jej jako liczby zbiorczej.</p>' : ''}
      ${noPlural ? '' : '<p class="note">⚡ = forma nieregularna (nie dodaje się zwykłego -s / -es).</p>'}
    </section>`;
  }

  function adjSection(w) {
    const a = w.adj;
    if (!a) return '';
    const comp = firstForm(a.comparative);
    const sup = firstForm(a.superlative);
    return `<section class="block">
      <h3 class="block__title">Stopień wyższy</h3>
      <div class="forms">
        ${formRow('Positive', a.base, false)}
        ${formRow('Comparative', a.comparative, comp !== a.base + 'er')}
        ${formRow('Superlative', a.superlative, sup !== a.base + 'est')}
      </div>
    </section>`;
  }

  function definitionsBlock(w) {
    const defs = [];
    if (w.def) defs.push({ pos: w.pos, text: w.def });
    for (const s of (w.api?.senses || [])) {
      if (defs.length >= 6) break;
      defs.push({ pos: s.pos, text: s.def });
    }
    if (!defs.length) return '';
    return `<section class="block">
      <h3 class="block__title">Znaczenie</h3>
      <ul class="defs">${defs.map(d => `<li>${d.pos ? `<span class="pos">${escapeHtml(posShort[d.pos] || d.pos)}</span>` : ''}${escapeHtml(d.text)}</li>`).join('')}</ul>
    </section>`;
  }

  function examplesBlock(w) {
    const list = [];
    if (w.ex) list.push(w.ex);
    for (const s of (w.api?.senses || [])) {
      if (s.example && !list.some(e => norm(e) === norm(s.example))) list.push(s.example);
      if (list.length >= 4) break;
    }
    if (!list.length) return '';
    return `<section class="block">
      <h3 class="block__title">Przykłady</h3>
      <ul class="examples">${list.map(e => `<li><span>${escapeHtml(e)}</span>
        <button class="speak-mini" type="button" data-speak="${escapeHtml(e)}" title="Wymów zdanie">${SPEAKER_ICON}</button></li>`).join('')}</ul>
    </section>`;
  }

  function tagsBlock(title, items, kind) {
    if (!items || !items.length) return '';
    return `<section class="block">
      <h3 class="block__title">${title}</h3>
      <div class="taglist">${items.slice(0, 12).map(t =>
        kind === 'link'
          ? `<button class="tag" type="button" data-open="${escapeHtml(t)}">${escapeHtml(t)}</button>`
          : `<span class="tag tag--static">${escapeHtml(t)}</span>`).join('')}</div>
    </section>`;
  }

  function relatedBlock(w) {
    const rel = all
      .filter(x => x !== w && x.pos === w.pos && Math.abs((x.tier || 3) - (w.tier || 3)) <= 1)
      .sort((a, b) => a.word.localeCompare(b.word))
      .slice(0, 8);
    if (!rel.length) return '';
    return `<section class="block">
      <h3 class="block__title">Podobne słowa</h3>
      <div class="taglist">${rel.map(x => `<button class="tag" type="button" data-open="${escapeHtml(x.word)}">${escapeHtml(x.word)}</button>`).join('')}</div>
    </section>`;
  }

  function renderDetail(w) {
    el.detailWord.textContent = w.word;
    el.detailIpa.textContent = (w.api?.ipa || w.ipa) ? `/${w.api?.ipa || w.ipa}/` : '';
    el.detailPos.textContent = posShort[w.pos] || w.pos;
    el.detailPos.title = posLabel[w.pos] || '';
    el.detailIrr.hidden = !w.irregular;
    el.detailPl.textContent = w.pl || '';
    el.detailPl.hidden = !w.pl;
    el.detailStar.setAttribute('aria-pressed', String(favs.has(w.word.toLowerCase())));

    const parts = [];
    if (w.pos === 'verb') parts.push(verbSection(w));
    if (w.pos === 'noun') parts.push(nounSection(w));
    if (w.pos === 'adjective') parts.push(adjSection(w));
    parts.push(definitionsBlock(w));
    parts.push(examplesBlock(w));
    parts.push(tagsBlock('Synonimy', w.api?.synonyms, 'link'));
    parts.push(tagsBlock('Antonimy', w.api?.antonyms, 'link'));
    if (w.tier) parts.push(`<section class="block">
      <h3 class="block__title">Częstotliwość</h3>
      <p class="note">${TIER_LABEL[w.tier] || ''} — ${TIER_HINT[w.tier] || ''}</p>
    </section>`);
    parts.push(relatedBlock(w));
    if (!w.api && navigator.onLine) parts.push('<div class="skel"></div><div class="skel"></div>');

    el.detailBody.innerHTML = parts.filter(Boolean).join('');
    el.detailBody.scrollTop = 0;

    if (!w.api && navigator.onLine) enrich(w);
  }

  function openDetail(word) {
    const w = all.find(x => x.word.toLowerCase() === String(word).toLowerCase());
    if (!w) return;
    state.open = w;
    el.detail.hidden = false;
    el.scrim.hidden = false;
    renderDetail(w);
    $$('.tile', el.grid).forEach(t => t.classList.toggle('is-open', t.dataset.word === w.word));
  }

  function closeDetail() {
    el.detail.hidden = true;
    el.scrim.hidden = true;
    state.open = null;
    $$('.tile', el.grid).forEach(t => t.classList.remove('is-open'));
  }

  /* ---------------- dictionaryapi.dev ---------------- */

  const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  function normalizeApi(payload) {
    const senses = [];
    const synonyms = [];
    const antonyms = [];
    let ipa = '';
    let audio = '';

    for (const entry of payload) {
      ipa = ipa || entry.phonetic || entry.phonetics?.find(p => p.text)?.text || '';
      audio = audio || entry.phonetics?.find(p => p.audio)?.audio || '';
      for (const meaning of entry.meanings || []) {
        for (const d of (meaning.definitions || []).slice(0, 2)) {
          senses.push({
            pos: meaning.partOfSpeech,
            def: d.definition,
            example: d.example || '',
          });
          (d.synonyms || []).forEach(s => synonyms.push(s));
          (d.antonyms || []).forEach(s => antonyms.push(s));
        }
        (meaning.synonyms || []).forEach(s => synonyms.push(s));
      }
    }

    const uniq = arr => [...new Set(arr.map(s => String(s).trim()).filter(Boolean))];

    return {
      ipa: ipa.replace(/^[[/(]|[\]/)]$/g, '').trim(),
      audio,
      senses: senses.slice(0, 8),
      synonyms: uniq(synonyms).slice(0, 12),
      antonyms: uniq(antonyms).slice(0, 10),
    };
  }

  async function lookup(rawWord) {
    const term = String(rawWord).trim();
    if (!term || !navigator.onLine) return null;

    /* Bez limitu czasu API potrafi wisieć w nieskończoność
       i zostawić pasek "pobieram..." na ekranie. */
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);

    try {
      const res = await fetch(API + encodeURIComponent(term), { signal: ctrl.signal });
      if (!res.ok) return null;
      const payload = await res.json();
      if (!Array.isArray(payload) || !payload.length) return null;
      const api = normalizeApi(payload);
      const word = payload[0].word || term;
      const pos = payload[0].meanings?.[0]?.partOfSpeech || 'noun';
      return { word, pos, api };
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function enrich(w) {
    const found = await lookup(w.word);
    if (!found) {
      const skel = el.detailBody.querySelector('.skel');
      if (skel) {
        skel.outerHTML = '<p class="note">Nie udało się dociągnąć danych z dictionaryapi.dev (limit 450 zapytań na godzinę albo brak sieci). Formy i tłumaczenia z pakietu działają offline.</p>';
        el.detailBody.querySelectorAll('.skel').forEach(s => s.remove());
      }
      return;
    }
    w.api = found.api;
    /* Części mowy NIE nadpisujemy dla słów wbudowanych — API
       potrafi zwrócić na początku inną niż w słowniku
       (np. "begin" zaczyna się od rzeczownika). */
    if (!w.builtIn) w.pos = found.pos || w.pos;
    if (!w.ipa) w.ipa = found.api.ipa || '';
    cacheApi(w.word, found.api);
    if (state.open === w) renderDetail(w);
  }

  function cacheApi(word, api) {
    const cache = store.get(LS.cache, {});
    cache[word.toLowerCase()] = api;
    const keys = Object.keys(cache);
    if (keys.length > 80) for (const k of keys.slice(0, keys.length - 80)) delete cache[k];
    store.set(LS.cache, cache);
  }

  async function onlineLookup() {
    const term = state.q.trim();
    if (!term) return;
    el.looking.hidden = false;
    const found = await lookup(term);
    el.looking.hidden = true;

    if (!found) {
      el.empty.hidden = false;
      $('#emptyTitle').textContent = navigator.onLine ? 'Nie ma takiego słowa' : 'Brak internetu';
      $('#emptyText').textContent = navigator.onLine
        ? `Sprawdziłem słownik wbudowany i dictionaryapi.dev — brak wpisów dla „${term}”. Sprawdź pisownię.`
        : 'Nie ma skąd pobrać słowa. Podłącz internet i spróbuj ponownie.';
      return;
    }

    /* Nowe słowo ląduje w launcherze na stałe (cache localStorage),
       a wyszukiwanie zostaje, żeby widać było, co zostało dodane. */
    const cache = store.get(LS.cache, {});
    cache[found.word.toLowerCase()] = found.api;
    store.set(LS.cache, cache);
    build();
    render();
    openDetail(found.word);
  }

  /* ---------------- wymowa ---------------- */

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'en-GB';
    u.rate = 0.92;
    u.pitch = 1;
    const voice = speechSynthesis.getVoices().find(v => /^en-GB/i.test(v.lang))
      || speechSynthesis.getVoices().find(v => /^en/i.test(v.lang));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }

  /* ---------------- dodawanie własnych słów ---------------- */

  function openModal() {
    el.modal.hidden = false;
    el.scrim.hidden = false;
    $('#addForm [name="word"]').focus();
  }

  function closeModal() {
    el.modal.hidden = true;
    if (el.detail.hidden) el.scrim.hidden = true;
  }

  function saveCustom(data) {
    const word = data.word.trim();
    if (!word) return;
    const custom = store.get(LS.custom, []);
    const pos = data.pos;
    const record = {
      word,
      pos,
      pl: data.pl.trim(),
      ipa: data.ipa.trim(),
      ex: data.ex.trim(),
      tier: 2,
      irregular: false,
      forms: [word],
      altForms: [],
      custom: true,
    };

    if (pos === 'verb') {
      const base = word;
      record.verb = {
        base,
        third: data.alt.trim() || base,
        ing: base.endsWith('e') ? base.slice(0, -1) + 'ing' : base + 'ing',
        past: data.past.trim() || base,
        pp: data.pp.trim() || data.past.trim() || base,
        plural: data.alt.trim() || base,
      };
      record.altForms = [record.verb.third, record.verb.ing, record.verb.past, record.verb.pp];
      record.irregular = [record.verb.past, record.verb.pp].some(f => f !== base);
    } else if (pos === 'noun') {
      const plural = data.alt.trim();
      record.noun = { singular: base, plural: plural || '—' };
      record.altForms = plural ? [plural] : [];
      record.irregular = !!plural && plural !== base + 's' && plural !== base + 'es';
    } else if (pos === 'adjective') {
      const comp = data.alt.trim();
      record.adj = { base, comparative: comp || (base.endsWith('e') ? base + 'r' : base + 'er'), superlative: (comp ? firstForm(comp) : base) + (firstForm(comp || base).endsWith('e') ? 'st' : 'est') };
      record.altForms = [record.adj.comparative, record.adj.superlative];
      record.irregular = !!comp && comp !== base + 'er';
    }

    const i = custom.findIndex(c => c.word.toLowerCase() === word.toLowerCase());
    if (i >= 0) custom[i] = record; else custom.push(record);
    store.set(LS.custom, custom);
    build();
    render();
    openDetail(record.word);
  }

  /* ---------------- zdarzenia ---------------- */

  function toggleFav(word, force) {
    const key = String(word).toLowerCase();
    const on = force !== undefined ? force : !favs.has(key);
    if (on) favs.add(key); else favs.delete(key);
    saveFavs();

    if (state.open && state.open.word.toLowerCase() === key) {
      el.detailStar.setAttribute('aria-pressed', String(on));
    }

    if (state.favsOnly && !on) { render(); return; }

    const tile = el.grid.querySelector(`.tile[data-word="${CSS.escape(word)}"] .tile__star`);
    if (tile) {
      tile.classList.toggle('is-on', on);
      tile.setAttribute('aria-pressed', String(on));
      const label = on ? 'Usuń z ulubionych' : 'Dodaj do ulubionych';
      tile.title = label;
      $('.sr-only', tile).textContent = `${label}: ${word}`;
    }
    el.favCount.textContent = favs.size;
  }

  el.search.addEventListener('input', () => {
    state.q = el.search.value;
    state.letter = null;
    state.focusIndex = 0;
    render();
  });

  el.clear.addEventListener('click', () => {
    state.q = '';
    el.search.value = '';
    el.search.focus();
    render();
  });

  el.emptyLookup.addEventListener('click', onlineLookup);

  el.grid.addEventListener('click', (e) => {
    const fav = e.target.closest('[data-fav]');
    if (fav) { toggleFav(fav.dataset.fav); return; }
    const open = e.target.closest('[data-open]');
    if (open) openDetail(open.dataset.open);
  });

  el.detailBody.addEventListener('click', (e) => {
    const sp = e.target.closest('[data-speak]');
    if (sp) { speak(sp.dataset.speak); return; }
    const open = e.target.closest('[data-open]');
    if (open) openDetail(open.dataset.open);
  });

  el.posChips.addEventListener('click', (e) => {
    const c = e.target.closest('[data-pos]');
    if (!c) return;
    state.pos = c.dataset.pos;
    state.letter = null;
    saveUi();
    render();
  });

  el.tierChips.addEventListener('click', (e) => {
    const c = e.target.closest('[data-tier]');
    if (!c) return;
    state.tier = c.dataset.tier;
    saveUi();
    render();
  });

  el.irrOnly.addEventListener('change', () => {
    state.irrOnly = el.irrOnly.checked;
    state.letter = null;
    saveUi();
    render();
  });

  el.rail.addEventListener('click', (e) => {
    const b = e.target.closest('[data-letter]');
    if (!b) return;
    state.letter = state.letter === b.dataset.letter ? null : b.dataset.letter;
    render();
  });

  el.favsBtn.addEventListener('click', () => {
    state.favsOnly = !state.favsOnly;
    render();
  });

  el.randomBtn.addEventListener('click', () => {
    const pool = currentResults();
    if (!pool.length) return;
    const w = pool[Math.floor(Math.random() * pool.length)];
    state.q = '';
    el.search.value = '';
    render();
    openDetail(w.word);
    el.grid.querySelector(`.tile[data-word="${CSS.escape(w.word)}"]`)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  el.detailClose.addEventListener('click', closeDetail);
  el.speakWord.addEventListener('click', () => state.open && speak(state.open.word));
  el.detailStar.addEventListener('click', () => {
    if (state.open) toggleFav(state.open.word, !favs.has(state.open.word.toLowerCase()));
  });

  el.scrim.addEventListener('click', () => {
    if (!el.modal.hidden) closeModal();
    else closeDetail();
  });

  el.addBtn.addEventListener('click', openModal);
  el.addClose.addEventListener('click', closeModal);
  el.addCancel.addEventListener('click', closeModal);

  el.addForm.addEventListener('change', (e) => {
    if (e.target.name === 'pos') {
      el.verbForms.classList.toggle('is-hidden', e.target.value !== 'verb');
    }
  });

  el.addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(el.addForm).entries());
    saveCustom(data);
    el.addForm.reset();
    el.verbForms.classList.add('is-hidden');
    closeModal();
  });

  window.addEventListener('online', () => { renderNet(); if (state.open && !state.open.api) enrich(state.open); });
  window.addEventListener('offline', renderNet);

  /* ---------------- klawiatura ---------------- */

  function moveFocus(delta) {
    const hits = $$('.tile__hit', el.grid);
    if (!hits.length) return;
    const next = Math.min(Math.max(state.focusIndex + delta, 0), hits.length - 1);
    state.focusIndex = next;
    hits[next].focus();
    hits[next].scrollIntoView({ block: 'nearest' });
  }

  function columns() {
    const hits = $$('.tile__hit', el.grid);
    if (hits.length < 2) return 1;
    return hits.filter(h => h.getBoundingClientRect().top === hits[0].getBoundingClientRect().top).length;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!el.modal.hidden) { closeModal(); return; }
      if (!el.detail.hidden) { closeDetail(); el.search.focus(); return; }
      if (state.q) {
        state.q = '';
        el.search.value = '';
        render();
        return;
      }
      /* Drugie Esc wychodzi z pola wyszukiwania — wtedy
         strzałki zaczynają sterować siatką kafelków. */
      if (document.activeElement === el.search) {
        el.search.blur();
        state.focusIndex = 0;
        $$('.tile__hit', el.grid)[0]?.focus();
      }
      return;
    }

    if (e.key === '/' && document.activeElement !== el.search && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      el.search.focus();
      el.search.select();
      return;
    }

    if (e.key === 'Enter' && document.activeElement === el.search) {
      e.preventDefault();
      if (!visible.length) onlineLookup();
      else openDetail(visible[0].word);
      return;
    }

    if (document.activeElement === el.search || !el.detail.hidden || !el.modal.hidden) return;

    if (e.key === 'f' || e.key === 'F') {
      state.favsOnly = !state.favsOnly;
      render();
      return;
    }

    const cols = columns();
    if (e.key === 'ArrowRight') { e.preventDefault(); moveFocus(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); moveFocus(-1); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(cols); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-cols); }
  });

  /* ---------------- start ---------------- */

  build();
  buildChips();
  render();
  renderNet();

  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  window.addEventListener('resize', () => { state.focusIndex = 0; });
})();