/* ------------------------------------------------------------------
   Page interactions. Everything here is an enhancement: the page is
   fully readable without it (only the project cards need projects.js).
   ------------------------------------------------------------------ */
(() => {
  const header = document.getElementById('site-header');
  const menuBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const backToTop = document.getElementById('back-to-top');
  const triangle = document.querySelector('.triangle');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const isMenuOpen = () => menuBtn.getAttribute('aria-expanded') === 'true';

  /* ---- Scroll: header background, back-to-top, rotating triangle ---- */
  let ticking = false;
  function update() {
    ticking = false;
    const y = window.scrollY;
    header.toggleAttribute('data-scrolled', y > 8 || isMenuOpen());
    backToTop.toggleAttribute('data-visible', y > window.innerHeight * 0.8);

    if (!reduceMotion.matches) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      triangle.style.transform = `translate(-50%, -50%) rotate(${(1 - progress) * 360}deg)`;
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  /* ---- Mobile menu ---- */
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    update();
  }
  menuBtn.addEventListener('click', () => setMenu(!isMenuOpen()));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  // Close the menu if the window grows to the desktop layout
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---- Highlight the nav link of the section in view ---- */
  const navLinks = [...document.querySelectorAll('.nav-link')];
  function setActive(id) {
    for (const a of navLinks) {
      const on = a.hash === `#${id}`;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    },
    // a thin band just above the middle of the screen decides which section is "current"
    { rootMargin: '-45% 0px -50% 0px' },
  );
  document.querySelectorAll('main > section[id]').forEach((s) => observer.observe(s));

  /* ---- Copy email button ---- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.querySelector('[data-copy-label]');
    const original = label.textContent;
    let timer;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = 'Copied!';
      } catch {
        window.location.href = `mailto:${btn.dataset.copy}`;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => (label.textContent = original), 2000);
    });
  });

  /* ---- Footer year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
