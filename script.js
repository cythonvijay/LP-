/* Original interaction implementation: Vijay Pandiselvam | © 2026. */
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !opening;
    document.body.classList.toggle('menu-open', opening);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  // Reveal elements as they enter the viewport; content remains visible without JS.
  const revealTargets = document.querySelectorAll('.studio-grid, .services-heading, .service-item, .project, .work-note, .philosophy-top, .process-step, .contact-copy, .contact-form');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));

  // Front-end validation and a truthful mail-client handoff (no fake server submission).
  const form = document.querySelector('#enquiry-form');
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !email) {
      status.textContent = 'Please add your name and email address.';
      (!name ? form.elements.name : form.elements.email).focus();
      return;
    }
    if (!emailValid) {
      status.textContent = 'Please enter a valid email address.';
      form.elements.email.focus();
      return;
    }
    const services = [...form.querySelectorAll('input[name="service"]:checked')].map(input => input.value).join(', ') || 'Not specified';
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBrand: ${form.elements.brand.value.trim() || 'Not provided'}\nServices: ${services}\n\nProject details:\n${form.elements.message.value.trim() || 'Not provided'}`);
    status.textContent = 'Opening your email app with the enquiry details…';
    window.location.href = `mailto:hello@rosedsigns.com?subject=${subject}&body=${body}`;
  });

  const currentYear = new Date().getFullYear();
  document.querySelector('#year').textContent = currentYear;
  document.querySelector('#credit-year').textContent = currentYear;
})();
