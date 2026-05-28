const pageTitles = {
  home:     'Lester Alaric Roberts',
  art:      'Art — Lester Alaric Roberts',
  projects: 'Projects — Lester Alaric Roberts',
  issues:   'Issues — Lester Alaric Roberts',
  books:    'Book Recs — Lester Alaric Roberts',
  hire:     'Hire Me — Lester Alaric Roberts'
};

// ── Smart scroll helper, only scrolls if the element is partially off-screen ──
function scrollToElement(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
  const topMargin = headerH + 16;   // clear the sticky header plus a small buffer
  const bottomMargin = vh * 0.15;   // leave ~15% of viewport below when scrolling up from bottom

  // Calculate how much is hidden above and below the desired safe zone
  const hiddenAbove = topMargin - rect.top;              // positive if top is above safe zone
  const hiddenBelow = rect.bottom - (vh - bottomMargin); // positive if bottom is below safe zone

  // Already fully visible? Do nothing.
  if (hiddenAbove <= 0 && hiddenBelow <= 0) return;

  // Scroll the minimum amount: if hidden above, scroll up; if hidden below, scroll down
  const scrollAmount = hiddenAbove > 0 ? -hiddenAbove : hiddenBelow;

  el.closest('.content-wrapper').scrollBy({ top: scrollAmount, behavior: 'smooth' });
}

function showPanel(hash) {
  // Only handle known page hashes; let the browser handle anchor links naturally
  if (!hash || !pageTitles[hash]) return;
  const id = hash;
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
  `<a href="#home" class="brand" data-disco="DISCO MODE: ACTIVATED">Lester Alaric Roberts</a>
  <button class="hamburger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <nav>
    <a href="#home">Home</a>
    <a href="#art">Art</a>
    <a href="#projects">Projects</a>
    <a href="#issues">Issues</a>
    <a href="#books">Book Recs</a>
    <a href="#hire">Hire Me</a>
  </nav>`;

document.querySelector('footer').innerHTML =
  `<div class="footer-row">
    <div class="footer-links">
      &copy; ${new Date().getFullYear()} <span data-disco="Lester A.J. Roberts III">Lester Roberts</span> &mdash;
      <span class="non-disco">
        <a href="https://www.linkedin.com/in/lester-roberts-b1188a163/">LinkedIn</a> &mdash;
        <a href="https://github.com/lesterbobs/lesterbobs.github.io">GitHub</a> &mdash;
        <a href="https://www.instagram.com/lesterbobs/">Instagram</a>
      </span>
      <span class="disco-only">Disco Mode Activations: <span data-disco-count>0</span></span>
    </div>
    <label class="disco-switch">
      <input type="checkbox" id="discoToggle" aria-label="Toggle Nondescript Switch" />
      <span class="disco-switch-track">
        <span class="disco-switch-thumb"></span>
        <span class="disco-switch-label disco-switch-off">OFF</span>
        <span class="disco-switch-label disco-switch-on">DISCO</span>
      </span>
    </label>
  </div>`;

// ── Disco mode ──
const DISCO_KEY = 'disco-mode';
const DISCO_COUNT_KEY = 'disco-toggle-count';

function getDiscoCount() {
  try { return parseInt(localStorage.getItem(DISCO_COUNT_KEY) || '0', 10) || 0; }
  catch (e) { return 0; }
}

function renderDiscoCount() {
  const n = getDiscoCount();
  document.querySelectorAll('[data-disco-count]').forEach(el => {
    el.textContent = n;
  });
}

function setDisco(on, opts = {}) {
  const { countToggle = true } = opts;
  if (on && countToggle) {
    try { localStorage.setItem(DISCO_COUNT_KEY, String(getDiscoCount() + 1)); } catch (e) {}
    renderDiscoCount();
  }
  document.body.classList.toggle('disco', on);
  // Swap alternate text on any element with a data-disco attribute
  document.querySelectorAll('[data-disco]').forEach(el => {
    if (on) {
      if (el.dataset.discoOriginal === undefined) {
        el.dataset.discoOriginal = el.textContent;
      }
      el.textContent = el.dataset.disco;
    } else if (el.dataset.discoOriginal !== undefined) {
      el.textContent = el.dataset.discoOriginal;
    }
  });
  // Swap image src on any element with a data-disco-src attribute
  document.querySelectorAll('[data-disco-src]').forEach(el => {
    if (on) {
      if (el.dataset.discoOriginalSrc === undefined) {
        el.dataset.discoOriginalSrc = el.getAttribute('src');
      }
      el.setAttribute('src', el.dataset.discoSrc);
    } else if (el.dataset.discoOriginalSrc !== undefined) {
      el.setAttribute('src', el.dataset.discoOriginalSrc);
    }
  });
  try { localStorage.setItem(DISCO_KEY, on ? '1' : '0'); } catch (e) {}
}

const discoToggle = document.getElementById('discoToggle');
if (discoToggle) {
  renderDiscoCount();
  let saved = '0';
  try { saved = localStorage.getItem(DISCO_KEY) || '0'; } catch (e) {}
  if (saved === '1') {
    discoToggle.checked = true;
    setDisco(true, { countToggle: false });
  }
  discoToggle.addEventListener('change', () => setDisco(discoToggle.checked));
}

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
  const hash = window.location.hash.slice(1);
  if (pageTitles[hash]) {
    // It's a page navigation
    showPanel(hash);
  } else if (hash) {
    // It's an in-page anchor link — expand parent accordion if needed, then scroll
    const el = document.getElementById(hash);
    if (el) {
      // If the target is inside a collapsed issue-body, expand it
      const body = el.closest('.issue-body');
      if (body) {
        const toggle = body.previousElementSibling;
        if (toggle && toggle.classList.contains('issue-toggle')) {
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
      // Scroll the target just enough to bring it into view
      scrollToElement(el);
    }
  }
});
// Initial page load
const initHash = window.location.hash.slice(1);
if (pageTitles[initHash]) {
  showPanel(initHash);
} else {
  showPanel('home');
  // If there's an anchor hash on load, expand parent accordion and scroll to center
  if (initHash) {
    setTimeout(() => {
      const el = document.getElementById(initHash);
      if (el) {
        const body = el.closest('.issue-body');
        if (body) {
          const toggle = body.previousElementSibling;
          if (toggle && toggle.classList.contains('issue-toggle')) {
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
        scrollToElement(el);
      }
    }, 100);
  }
}

// ── Intercept in-page anchor clicks so we control the scroll ──
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href').slice(1);
  if (!hash || pageTitles[hash]) return; // let page-nav links go through showPanel
  const el = document.getElementById(hash);
  if (!el) return;
  e.preventDefault();
  const body = el.closest('.issue-body');
  if (body) {
    const toggle = body.previousElementSibling;
    if (toggle && toggle.classList.contains('issue-toggle')) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }
  // Set the hash so :target CSS triggers, but suppress the browser's auto-scroll
  const wrapper = document.querySelector('.content-wrapper');
  const prevScroll = wrapper.scrollTop;
  location.hash = hash;
  wrapper.scrollTop = prevScroll;
  scrollToElement(el);
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => overlay.classList.add('active'));
});

// ── Issues accordion ──
document.querySelectorAll('.issue-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.issue-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
    // Open clicked (unless it was already open)
    if (!expanded) toggle.setAttribute('aria-expanded', 'true');
  });
});
