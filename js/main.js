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
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      const name = form.querySelector('input[type="text"]')?.value?.trim();
      const company = form.querySelectorAll('input[type="text"]')[1]?.value?.trim();
      const message = form.querySelector('textarea')?.value?.trim();

      const subject = encodeURIComponent('QA consultation inquiry');
      const body = encodeURIComponent(
        `Name: ${name || '—'}\nEmail: ${email || '—'}\nCompany: ${company || '—'}\n\n${message || ''}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initContactForm();
  });
})();
