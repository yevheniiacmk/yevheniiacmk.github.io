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

  document.addEventListener('DOMContentLoaded', () => {
    window.__formspreeSent =
      new URLSearchParams(window.location.search).get('sent') === '1';
    initMobileNav();
    initContactForm();
  });

  document.addEventListener('localeapplied', showFormspreeSuccess);
})();
