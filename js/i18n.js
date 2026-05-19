(function () {
  const SUPPORTED = ['en', 'ru', 'uk'];
  const STORAGE_KEY = 'lang';

  function flatten(obj, prefix = '') {
    const out = {};
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(out, flatten(value, path));
      } else {
        out[path] = value;
      }
    }
    return out;
  }

  function detectLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;

    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('uk')) return 'uk';
    if (nav.startsWith('ru')) return 'ru';
    return 'en';
  }

  function localeUrl(lang) {
    return new URL(`locales/${lang}.json`, document.baseURI).href;
  }

  async function loadLocale(lang) {
    const res = await fetch(localeUrl(lang));
    if (!res.ok) throw new Error(`Failed to load locale: ${lang}`);
    return flatten(await res.json());
  }

  function applyStrings(strings) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] != null) el.textContent = strings[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (strings[key] != null) el.innerHTML = strings[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (strings[key] != null) el.placeholder = strings[key];
    });

    if (strings['meta.title']) {
      document.title = strings['meta.title'];
    }

    const desc = document.querySelector('meta[name="description"]');
    if (desc && strings['meta.description']) {
      desc.setAttribute('content', strings['meta.description']);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && strings['meta.title']) {
      ogTitle.setAttribute('content', strings['meta.title']);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && strings['meta.description']) {
      ogDesc.setAttribute('content', strings['meta.description']);
    }
  }

  function updateSwitcher(lang) {
    document.querySelectorAll('.lang-switch button[data-lang]').forEach((btn) => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  let currentLang = detectLang();
  let stringsCache = {};

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    if (!stringsCache[lang]) {
      stringsCache[lang] = await loadLocale(lang);
    }
    applyStrings(stringsCache[lang]);
    updateSwitcher(lang);
  }

  function initSwitcher() {
    const switcher = document.querySelector('.lang-switch');
    if (!switcher) return;

    switcher.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      setLang(btn.getAttribute('data-lang'));
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    initSwitcher();
    try {
      await setLang(currentLang);
    } catch (err) {
      console.error(err);
      if (currentLang !== 'en') await setLang('en');
    }
  });

  window.i18n = { setLang, getLang: () => currentLang };
})();
