/* Silla Vacía · Script principal */
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PageFlip } from 'page-flip';

(function () {
  'use strict';

  // Inicializar AOS con soporte completo de refresco dinámico
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
  } else {
    initAOS();
  }

  // Refrescar AOS cuando todas las imágenes y recursos terminen de renderizar
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  // Navbar scroll optimizado con requestAnimationFrame
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    let isScrolled = false;

    const updateNavbar = () => {
      const scrolled = window.scrollY > 30;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        navbar.classList.toggle('scrolled', isScrolled);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.requestAnimationFrame(updateNavbar);
  }

  // Menú mobile optimizado y accesible
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('navCloseBtn');

  if (toggle && links) {
    const openMenu = () => {
      links.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.classList.add('open');
      document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('open');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (links.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }

    // Cerrar al hacer clic en cualquier enlace
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        closeMenu();
      }
    });

    // Cerrar automáticamente si la ventana se agranda a tamaño desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && links.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }

  // ============================================================
  // FLIPBOOK 3D INTERACTIVO (DESKTOP >= 1024px)
  // ============================================================
  const flipbookContainer = document.getElementById('flipbookContainer');
  const flipPrevBtn = document.getElementById('flipbookPrev');
  const flipNextBtn = document.getElementById('flipbookNext');
  const flipIndicator = document.getElementById('flipbookPageIndicator');
  const flipProgress = document.getElementById('flipbookProgressFill');
  let pageFlipInstance = null;

  function initDesktopFlipbook() {
    if (!flipbookContainer) return;

    const isLandscapeTablet = (window.innerWidth >= 768 && window.innerHeight >= 480 && window.matchMedia('(orientation: landscape)').matches);
    const isDesktop = window.innerWidth >= 1024;
    const shouldShowFlipbook = isDesktop || isLandscapeTablet;

    if (!shouldShowFlipbook) {
      if (pageFlipInstance) {
        try {
          pageFlipInstance.destroy();
        } catch (_) {}
        pageFlipInstance = null;
      }
      return;
    }

    if (pageFlipInstance) return;

    try {
      const pageElements = flipbookContainer.querySelectorAll('.flip-page');
      if (!pageElements.length) return;

      const isCompactLandscape = isLandscapeTablet && window.innerHeight < 700;
      const baseWidth = isCompactLandscape ? 360 : 440;
      const baseHeight = isCompactLandscape ? 500 : 620;

      pageFlipInstance = new PageFlip(flipbookContainer, {
        width: baseWidth,
        height: baseHeight,
        size: 'stretch',
        minWidth: 260,
        maxWidth: 540,
        minHeight: 360,
        maxHeight: 760,
        maxShadowOpacity: 0.4,
        showCover: true,
        drawShadow: true,
        flippingTime: 750,
        usePortrait: false,
        startPage: 0,
        autoSize: true,
        disableFlipByClick: false
      });

      pageFlipInstance.loadFromHTML(pageElements);

      const totalPages = pageElements.length;

      const updateFlipUI = (pageIndex) => {
        const displayPage = pageIndex + 1;
        if (flipIndicator) {
          flipIndicator.textContent = `Página ${displayPage} de ${totalPages}`;
        }
        if (flipProgress) {
          const percent = Math.min(100, Math.max(16, (displayPage / totalPages) * 100));
          flipProgress.style.width = `${percent}%`;
        }
        if (flipPrevBtn) {
          flipPrevBtn.disabled = pageIndex === 0;
        }
        if (flipNextBtn) {
          flipNextBtn.disabled = pageIndex >= totalPages - 1;
        }
      };

      pageFlipInstance.on('flip', (e) => {
        updateFlipUI(e.data);
      });

      pageFlipInstance.on('init', () => {
        updateFlipUI(0);
      });

      if (flipPrevBtn) {
        flipPrevBtn.onclick = () => {
          if (pageFlipInstance) pageFlipInstance.flipPrev();
        };
      }

      if (flipNextBtn) {
        flipNextBtn.onclick = () => {
          if (pageFlipInstance) pageFlipInstance.flipNext();
        };
      }

      const wrapper = document.getElementById('flipbookWrapper');
      if (wrapper) {
        wrapper.addEventListener('keydown', (e) => {
          if (!pageFlipInstance) return;
          if (e.key === 'ArrowRight') {
            pageFlipInstance.flipNext();
          } else if (e.key === 'ArrowLeft') {
            pageFlipInstance.flipPrev();
          }
        });
      }

      updateFlipUI(0);
      if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
      }
    } catch (err) {
      console.warn('FlipBook notice:', err);
    }
  }

  // Inicializar Flipbook tras carga o cambio de pantalla
  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(initDesktopFlipbook, 80);
    } else {
      window.addEventListener('DOMContentLoaded', () => setTimeout(initDesktopFlipbook, 80));
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initDesktopFlipbook, 200);
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initDesktopFlipbook, 250);
    }, { passive: true });
  }

  // Carrusel Galería (Móvil / Tablet < 1024px)
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    let current = 0;

    // Crear dots por lotes usando DocumentFragment
    const fragment = document.createDocumentFragment();
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      fragment.appendChild(dot);
    });
    dotsWrap.appendChild(fragment);

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
        if (img && img.parentElement) {
          img.parentElement.addEventListener('click', () => openModal(i));
        }
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