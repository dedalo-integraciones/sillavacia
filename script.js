/* Silla Vacía · Script principal */
(function () {
  'use strict';

  // Inicializar AOS
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú mobile
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Carrusel Galería
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    let current = 0;

    // Crear dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.carousel-dot');

    function update() {
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(i) {
      current = (i + total) % total;
      update();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Swipe táctil
    let startX = 0;
    let isDragging = false;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) next(); else prev();
      }
    });
  }

  // Modal Galería
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const modalCounter = document.getElementById('modalCounter');

  if (modal && modalImg) {
    const slides = track ? track.querySelectorAll('.carousel-slide') : [];
    const allImages = Array.from(slides).map(s => s.querySelector('img'));
    let modalIndex = 0;

    function openModal(index) {
      modalIndex = index;
      if (allImages[index]) {
        modalImg.src = allImages[index].src;
        modalImg.alt = allImages[index].alt;
      }
      modalCounter.textContent = (index + 1) + ' / ' + allImages.length;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function modalNextImg() {
      modalIndex = (modalIndex + 1) % allImages.length;
      if (allImages[modalIndex]) {
        modalImg.src = allImages[modalIndex].src;
        modalImg.alt = allImages[modalIndex].alt;
      }
      modalCounter.textContent = (modalIndex + 1) + ' / ' + allImages.length;
    }

    function modalPrevImg() {
      modalIndex = (modalIndex - 1 + allImages.length) % allImages.length;
      if (allImages[modalIndex]) {
        modalImg.src = allImages[modalIndex].src;
        modalImg.alt = allImages[modalIndex].alt;
      }
      modalCounter.textContent = (modalIndex + 1) + ' / ' + allImages.length;
    }

    if (allImages.length) {
      allImages.forEach((img, i) => {
        img.parentElement.style.cursor = 'zoom-in';
        img.parentElement.addEventListener('click', () => openModal(i));
      });
    }

    modalClose.addEventListener('click', closeModal);
    modalNext.addEventListener('click', modalNextImg);
    modalPrev.addEventListener('click', modalPrevImg);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') modalNextImg();
       if (e.key === 'ArrowLeft') modalPrevImg();
     });
   }

  // Background image cycling in Hero
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    const bgLayers = heroBg.querySelectorAll('.hero-bg-layer');
    let bgIndex = 0;
    const interval = 6000;

    function cycleBg() {
      if (!bgLayers.length) return;
      bgLayers[bgIndex].classList.remove('active');
      bgIndex = (bgIndex + 1) % bgLayers.length;
      bgLayers[bgIndex].classList.add('active');
    }

    if (bgLayers.length > 1) {
      bgLayers[0].classList.add('active');
      setInterval(cycleBg, interval);
    }
  }
})();