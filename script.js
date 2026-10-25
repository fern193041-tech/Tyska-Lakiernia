// TYSKA LAKIERNIA — KATALOG MALOWAŃ
// Malowania dodajesz bezpośrednio do tablicy allItems poniżej.
// Każdy kolejny obiekt oddziel przecinkiem. Nie używamy pliku JSON.

const allItems = [
  {
    title: "PKM Tychy #4701",
    model: "MAN A23 4d (NEOMAN v3)",
    operator: "PKM TYCHY",
    category: "MAN",
    description: "MANiek z numerkiem takim fajnym :3",
    image: "Images/chujwdupie.png",
    download: "https://www.mediafire.com/file/x920x6e02nogmcx/PKM_Tychy%25234701.rar/file",
    version: "Wersja 1.0",
    tags: "JEBUT I POSZŁO"
  },
  {
    title: "PKM Tychy #4699",
    model: "Solaris Urbino (Iwo)",
    operator: "PKM TYCHY",
    category: "SOLARIS",
    description: "gowno kompletne z napedem takim fajnym",
    image: "Images/solarescwelu.png",
    download: "https://www.mediafire.com/file/jhgumm3gmvhbqzw/PKM_Tychy_4699.rar/file",
    version: "Wersja 1.4",
    tags: "JEBUT I POSZŁO"
  }
];

const catalog = document.getElementById('catalog');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const busFilter = document.getElementById('busFilter');
const operatorFilter = document.getElementById('operatorFilter');

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function fillFilters() {
  const buses = [...new Set(allItems.map(x => x.model).filter(Boolean))].sort();
  const operators = [...new Set(allItems.map(x => x.operator).filter(Boolean))].sort();
  busFilter.innerHTML = '<option value="">Wszystkie modele</option>' + buses.map(x => `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join('');
  operatorFilter.innerHTML = '<option value="">Wszyscy operatorzy</option>' + operators.map(x => `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join('');
  document.getElementById('count').textContent = allItems.length;
}

function render() {
  const q = search.value.toLocaleLowerCase('pl').trim();
  const shown = allItems.filter(x => {
    const hay = [x.title, x.model, x.operator, x.description, x.tags].join(' ').toLocaleLowerCase('pl');
    return hay.includes(q) && (!busFilter.value || x.model === busFilter.value) && (!operatorFilter.value || x.operator === operatorFilter.value);
  });

  catalog.innerHTML = shown.map(x => {
    const image = x.image
      ? `<img src="${escapeHtml(x.image)}" alt="Podgląd: ${escapeHtml(x.title)}" loading="lazy" onerror="this.style.display='none'">`
      : '<div class="placeholder-bus" aria-hidden="true"></div>';
    const download = x.download
      ? `<a class="download-link" href="${escapeHtml(x.download)}" target="_blank" rel="noopener">Pobierz ↗</a>`
      : '<span class="version">Pliki wkrótce</span>';

    return `<article class="card"><div class="card-image">${image}<span class="badge">${escapeHtml(x.category || 'MALOWANIE')}</span></div><div class="card-content"><div class="card-meta"><span>${escapeHtml(x.operator || 'Projekt własny')}</span><span>•</span><span>${escapeHtml(x.model || 'OMSI 2')}</span></div><h3>${escapeHtml(x.title || 'Bez nazwy')}</h3><p>${escapeHtml(x.description || 'Malowanie do OMSI 2.')}</p><div class="card-bottom"><span class="version">${escapeHtml(x.version || 'Wersja 1.0')}</span>${download}</div></div></article>`;
  }).join('');

  empty.hidden = shown.length !== 0;
  empty.textContent = allItems.length === 0
    ? 'Katalog jest pusty. Dodaj malowanie w tablicy allItems na górze pliku script.js.'
    : 'Nie znaleziono malowań. Zmień wyszukiwanie lub filtry.';
}

fillFilters();
render();
search.addEventListener('input', render);
busFilter.addEventListener('change', render);
operatorFilter.addEventListener('change', render);
