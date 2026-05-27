// Only target art pieces — not book cards
const pieces = Array.from(document.querySelectorAll('#panel-art .piece'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const placardTitle = document.getElementById('placardTitle');
const placardDesc = document.getElementById('placardDesc');
const placardKind = document.getElementById('placardKind');
let currentIndex = -1;

function openLightbox(index) {
  currentIndex = index;
  const piece = pieces[index];
  const img = piece.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  placardTitle.textContent = piece.querySelector('.piece-title').textContent;
  placardDesc.textContent = piece.querySelector('.piece-desc').textContent;
  const metaSpans = piece.querySelectorAll('.piece-meta span');
  placardKind.textContent = metaSpans[metaSpans.length - 1].textContent;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  currentIndex = -1;
}

function step(delta) {
  if (currentIndex < 0) return;
  openLightbox((currentIndex + delta + pieces.length) % pieces.length);
}

pieces.forEach((piece, i) => {
  piece.querySelector('.piece-frame').addEventListener('click', () => openLightbox(i));
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); step(1); });
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-stage') || e.target.classList.contains('lightbox-image')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
});
