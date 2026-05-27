const pageTitles = {
  home:     'Lester Alaric Roberts',
  art:      'Art — Lester Alaric Roberts',
  projects: 'Projects — Lester Alaric Roberts',
  books:    'Book Recs — Lester Alaric Roberts',
  hire:     'Hire Me — Lester Alaric Roberts'
};

function showPanel(hash) {
  const id = (hash && pageTitles[hash]) ? hash : 'home';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.title = pageTitles[id];
  document.querySelector('.content-wrapper').scrollTo(0, 0);
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
  // Close mobile nav on selection
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (nav && hamburger) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.querySelector('header').innerHTML =
  `<a href="#home" class="brand">Lester Alaric Roberts</a>
  <button class="hamburger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <nav>
    <a href="#home">Home</a>
    <a href="#art">Art</a>
    <a href="#projects">Projects</a>
    <a href="#books">Book Recs</a>
    <a href="#hire">Hire Me</a>
  </nav>`;

document.querySelector('footer').innerHTML =
  `&copy; ${new Date().getFullYear()} Lester Roberts &mdash; <a href="https://www.linkedin.com/in/lester-roberts-b1188a163/">LinkedIn</a> &mdash; <a href="https://github.com/lesterbobs/lesterbobs.github.io">GitHub</a> &mdash; <a href="https://www.instagram.com/lesterbobs/">Instagram</a>`;

// ── Hamburger toggle ──
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

const overlay = document.getElementById('loadingOverlay');

window.addEventListener('pageshow', () => overlay.classList.remove('active'));
window.addEventListener('hashchange', () => {
  overlay.classList.remove('active');
  showPanel(window.location.hash.slice(1));
});
showPanel(window.location.hash.slice(1));

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => overlay.classList.add('active'));
});
