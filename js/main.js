(function () {
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right');
    if (!toggle || !navRight) return;

    toggle.addEventListener('click', () => {
      const open = navRight.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navRight.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navRight.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initContactForm() {
    const nextInput = document.getElementById('formspree-next');
    if (nextInput) {
      nextInput.value = `${window.location.origin}${window.location.pathname}?sent=1#contact`;
    }
  }

  function showFormspreeSuccess() {
    if (!window.__formspreeSent) return;

    const form = document.querySelector('.contact-form');
    const success = document.getElementById('contact-success');
    if (success) success.hidden = false;
    if (form) form.hidden = true;

    history.replaceState(null, '', `${window.location.pathname}#contact`);
    window.__formspreeSent = false;
  }

  function showBuffOverlay(overlay) {
    overlay.hidden = false;
    overlay.classList.remove('is-hiding');
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function hideBuffOverlay(overlay) {
    if (!overlay.classList.contains('is-visible')) return;

    overlay.classList.remove('is-visible');
    overlay.classList.add('is-hiding');
    overlay.setAttribute('aria-hidden', 'true');

    const finishHide = () => {
      overlay.hidden = true;
      overlay.classList.remove('is-hiding');
      overlay.removeEventListener('animationend', finishHide);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishHide();
    } else {
      overlay.addEventListener('animationend', finishHide);
    }
  }

  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const showAfter = 320;

    const updateVisibility = () => {
      const show = window.scrollY > showAfter;
      btn.classList.toggle('is-visible', show);
      btn.setAttribute('aria-hidden', show ? 'false' : 'true');
      btn.tabIndex = show ? 0 : -1;
    };

    btn.addEventListener('click', () => {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    });

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
  }

  function initBuffs() {
    const overlays = {
      businesslike: document.getElementById('buff-businesslike'),
      communication: document.getElementById('buff-communication'),
      tech: document.getElementById('buff-tech'),
      stress: document.getElementById('buff-stress'),
    };

    document.querySelectorAll('.buff-btn[data-buff]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.buff;
        const overlay = overlays[key];
        const active = !btn.classList.contains('is-active');

        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');

        if (!overlay) return;

        if (active) {
          showBuffOverlay(overlay);
        } else {
          hideBuffOverlay(overlay);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.__formspreeSent =
      new URLSearchParams(window.location.search).get('sent') === '1';
    initMobileNav();
    initContactForm();
    initBackToTop();
    initBuffs();
  });

  document.addEventListener('localeapplied', showFormspreeSuccess);
})();
