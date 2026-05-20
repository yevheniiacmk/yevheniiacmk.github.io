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
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const overlays = {
      businesslike: document.getElementById('buff-businesslike'),
      communication: document.getElementById('buff-communication'),
      tech: document.getElementById('buff-tech'),
      stress: document.getElementById('buff-stress'),
    };
    const buffButtons = document.querySelectorAll('.buff-btn[data-buff]');

    function setBuffActive(btn, active) {
      const overlay = overlays[btn.dataset.buff];
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (!overlay) return;
      if (active) {
        showBuffOverlay(overlay);
      } else {
        hideBuffOverlay(overlay);
      }
    }

    function deactivateOtherBuffs(keepBtn) {
      buffButtons.forEach((other) => {
        if (other === keepBtn || !other.classList.contains('is-active')) return;
        setBuffActive(other, false);
      });
    }

    function enforceSingleBuffOnMobile() {
      if (!mobileMq.matches) return;
      const active = [...buffButtons].filter((btn) => btn.classList.contains('is-active'));
      active.slice(1).forEach((btn) => setBuffActive(btn, false));
    }

    buffButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const active = !btn.classList.contains('is-active');
        if (active && mobileMq.matches) {
          deactivateOtherBuffs(btn);
        }
        setBuffActive(btn, active);
      });
    });

    mobileMq.addEventListener('change', enforceSingleBuffOnMobile);
    enforceSingleBuffOnMobile();
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
