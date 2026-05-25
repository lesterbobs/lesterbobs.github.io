(function () {
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
  }

  document.querySelector('header').innerHTML =
    `<a href="#home" class="brand">Lester Alaric Roberts</a>
    <nav>
      <a href="#home">Home</a>
      <a href="#art">Art</a>
      <a href="#projects">Projects</a>
      <a href="#books">Book Recs</a>
      <a href="#hire">Hire Me</a>
    </nav>`;

  document.querySelector('footer').innerHTML =
    `&copy; ${new Date().getFullYear()} Lester Roberts &mdash; <a href="https://www.linkedin.com/in/lester-roberts-b1188a163/">LinkedIn</a> &mdash; <a href="https://github.com/lesterbobs/lesterbobs.github.io">GitHub</a> &mdash; <a href="https://www.instagram.com/lesterbobs/">Instagram</a>`;

  window.addEventListener('hashchange', () => showPanel(window.location.hash.slice(1)));
  showPanel(window.location.hash.slice(1));

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('loadingOverlay').classList.add('active');
    });
  });
}());
