import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Compass,
  Heart,
  Sparkles,
  Mic,
  Shield,
  Layers,
  FileText,
  Download,
  Menu
} from 'lucide-react';

// Import hero images directly so Vite bundles and hashes them correctly for Vercel
import heroImg0 from './images/hero-d/0.webp';
import heroImg1 from './images/hero-d/1.webp';
import heroImg2 from './images/hero-d/2.webp';
import heroImg4 from './images/hero-d/4.webp';

// Import gallery images
import gallery0 from './assets/gallery/0.webp';
import gallery1 from './assets/gallery/1.webp';
import gallery2 from './assets/gallery/2.webp';
import gallery3 from './assets/gallery/3.webp';
import gallery4 from './assets/gallery/4.webp';

const heroImages = [heroImg0, heroImg1, heroImg2, heroImg4];

const galleryImages = [
  { src: gallery0, alt: 'Espacio cálido de consulta y acompañamiento terapéutico' },
  { src: gallery1, alt: 'Detalles del consultorio y ambiente de introspección' },
  { src: gallery2, alt: 'Rincón de reflexión y presencia terapéutica' },
  { src: gallery3, alt: 'Materiales y elementos de trabajo gestáltico e integrador' },
  { src: gallery4, alt: 'Espacio de encuentro humano y bienestar emocional' },
];

const benefits = [
  {
    icon: Compass,
    title: 'Mayor claridad',
    description: 'Entendés mejor lo que sentís y por qué actuás como actuás en tus momentos clave.',
  },
  {
    icon: Shield,
    title: 'Calma interna',
    description: 'Aprendés a regular el estrés y la ansiedad desde adentro hacia afuera.',
  },
  {
    icon: Mic,
    title: 'Voz propia',
    description: 'Reconocés tus necesidades genuinas y sabés cómo expresarlas asertivamente.',
  },
  {
    icon: Sparkles,
    title: 'Autonomía',
    description: 'Salís del proceso con herramientas prácticas que podés usar por tu propia cuenta.',
  },
  {
    icon: Heart,
    title: 'Vínculos más sanos',
    description: 'Mejorás la forma en que te relacionás con los demás y con vos mismo.',
  },
  {
    icon: Layers,
    title: 'Integración profunda',
    description: 'Conectás cuerpo, emoción y pensamiento de manera coherente y armónica.',
  },
];

const timelineSteps = [
  {
    num: 1,
    title: 'Evaluación inicial',
    desc: 'Historia clínica, objetivos terapéuticos compartidos y construcción del vínculo de confianza.',
  },
  {
    num: 2,
    title: 'Respiración consciente',
    desc: 'Regulación de ansiedad y reconexión con el presente mediante respiración diafragmática.',
  },
  {
    num: 3,
    title: 'Visualización guiada',
    desc: 'Claridad en objetivos vitales y activación de la motivación interna.',
  },
  {
    num: 4,
    title: 'Numerología simbólica',
    desc: 'Exploración de patrones personales y resignificación de vivencias.',
  },
  {
    num: 5,
    title: 'Tapping (EFT)',
    desc: 'Reducción de la intensidad emocional asociada a recuerdos o situaciones de bloqueo.',
  },
  {
    num: 6,
    title: 'Integración de recursos',
    desc: 'Consolidación de aprendizajes y construcción de tu kit personal de autocuidado.',
  },
  {
    num: 7,
    title: 'Cierre y proyección',
    desc: 'Evaluación de logros alcanzados, ritual simbólico de cierre y plan de continuidad.',
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeroBg, setActiveHeroBg] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll listener for sticky blurred navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background image cycling in Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroBg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Lightbox keyboard controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    },
    [lightboxOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-[#FFFDE1] text-[#1A1A1A] font-sans-body relative selection:bg-[#FE8505] selection:text-white">
      {/* ============================================================
           NAVBAR
      ============================================================ */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFDE1]/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Silla Vacía - Inicio"
          >
            <img
              src="/logo-o.webp"
              alt="Logo Silla Vacía"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif-title text-2xl tracking-wide text-[#1A1A1A] hidden sm:inline-block">
              Silla Vacía
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#hero"
              className="text-[#1A1A1A] hover:text-[#FE8505] transition-colors relative py-1"
            >
              Inicio
            </a>
            <a
              href="#acerca"
              className="text-[#1A1A1A] hover:text-[#FE8505] transition-colors relative py-1"
            >
              Acerca de
            </a>
            <a
              href="#programas"
              className="text-[#1A1A1A] hover:text-[#FE8505] transition-colors relative py-1"
            >
              Programas
            </a>
            <a
              href="#galeria"
              className="text-[#1A1A1A] hover:text-[#FE8505] transition-colors relative py-1"
            >
              Galería
            </a>
            <a
              href="/SILLA VACIA BROUCHER.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#FE8505] hover:text-[#E52E01] transition-colors py-1"
            >
              <FileText size={16} />
              <span>Folleto PDF</span>
            </a>
            <a
              href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20gustar%C3%ADa%20consultar%20por%20acompa%C3%B1amiento%20terap%C3%A9utico"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FE8505] hover:bg-[#E52E01] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Escribinos
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1A1A1A] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bg-[#FFFDE1] border-b border-[#FE8505]/20 shadow-xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1A1A1A] hover:text-[#FE8505] py-1"
            >
              Inicio
            </a>
            <a
              href="#acerca"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1A1A1A] hover:text-[#FE8505] py-1"
            >
              Acerca de
            </a>
            <a
              href="#programas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1A1A1A] hover:text-[#FE8505] py-1"
            >
              Programas
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1A1A1A] hover:text-[#FE8505] py-1"
            >
              Galería
            </a>
            <a
              href="/SILLA VACIA BROUCHER.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-lg font-medium text-[#FE8505] py-1"
            >
              <FileText size={20} />
              <span>Ver Folleto en PDF</span>
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20gustar%C3%ADa%20consultar%20por%20acompa%C3%B1amiento%20terap%C3%A9utico"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-[#FE8505] hover:bg-[#E52E01] text-white py-3 rounded-full font-semibold shadow-md"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================
           SECCIÓN 1 — HERO
      ============================================================ */}
      <section
        id="hero"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#FFFDE1]"
      >
        {/* Background Image Carousel Layer with Crossfade */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`hero-bg-layer ${idx === activeHeroBg ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          {/* Calibrated Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,253,225,0.95) 0%, rgba(255,253,225,0.70) 45%, transparent 75%)',
            }}
          />
        </div>

        {/* Ambient subtle glow only on extreme top-left corner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-[#FE8505]/10 blur-3xl animate-float" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-[#FE8505] uppercase mb-4 px-3.5 py-1.5 rounded-full bg-[#FE8505]/10 border border-[#FE8505]/20">
              ACOMPAÑAMIENTO TERAPÉUTICO
            </span>

            <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.12] mb-6 tracking-tight">
              Un espacio para volverte a{' '}
              <span className="text-[#FE8505] italic font-serif">encontrar</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-light text-[#2b2b2b] leading-relaxed mb-8 max-w-xl">
              Acompañamiento con enfoque humano, integrador y orientado a tu bienestar real.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20gustar%C3%ADa%20iniciar%20un%20proceso%20terap%C3%A9utico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#FE8505] hover:bg-[#E52E01] text-white font-semibold rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Empezá tu proceso hoy</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#programas"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[#1A1A1A] hover:text-[#FE8505] font-medium transition-colors group"
              >
                <span>Conocé nuestros programas</span>
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#acerca"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity z-20"
          aria-label="Ir a la siguiente sección"
        >
          <div className="w-6 h-10 border-2 border-[#1A1A1A] rounded-full flex justify-center pt-1.5">
            <span className="w-1.5 h-2 bg-[#1A1A1A] rounded-full animate-scroll-dot" />
          </div>
        </a>
      </section>

      {/* ============================================================
           SECCIÓN 2 — ACERCA DE
      ============================================================ */}
      <section id="acerca" className="py-20 lg:py-28 bg-[#FFFDE1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            {/* Image Card Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FFEFD3] to-[#FFD9A8] p-8 flex flex-col items-center justify-center border border-[#FE8505]/20 relative group">
                <img
                  src="/logo-o.webp"
                  alt="Espacio cálido de Silla Vacía"
                  className="w-4/5 h-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FE8505]/15 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </div>
              <div className="mt-5 text-center">
                <span className="font-serif-title text-2xl text-[#1A1A1A] block">
                  Estelle Darcy
                </span>
                <small className="text-[#6b6b6b] text-sm block mt-0.5">
                  Acompañamiento Terapéutico · Enfoque Gestáltico
                </small>
              </div>
            </div>

            {/* Approach Text */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="inline-block text-xs font-semibold tracking-wider text-[#FE8505] uppercase bg-[#FE8505]/10 px-3.5 py-1 rounded-full w-fit mb-4">
                NUESTRO ENFOQUE
              </span>

              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-6 leading-tight">
                Terapia integrativa para personas reales
              </h2>

              <div className="space-y-4 text-[#3a3a3a] text-base sm:text-lg leading-relaxed">
                <p>
                  En <strong>Silla Vacía</strong> acompañamos procesos de autoconocimiento y cambio
                  personal desde un enfoque integrativo. Combinamos herramientas de la psicología
                  gestáltica y técnicas complementarias para ofrecer una experiencia terapéutica
                  completa y respetuosa.
                </p>
                <p className="italic text-[#1A1A1A]">
                  Cada persona es única. Por eso nuestros programas se adaptan a lo que
                  verdaderamente necesitás, sin atajos ni promesas vacías.
                </p>
              </div>

              <blockquote className="mt-8 p-6 bg-[#E52E01]/5 border-l-4 border-[#E52E01] rounded-r-2xl font-serif-title italic text-xl sm:text-2xl text-[#1A1A1A] leading-snug shadow-sm">
                “El cambio no ocurre cuando decidimos ser diferentes, sino cuando nos permitimos ser
                exactamente como somos.”
              </blockquote>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="pt-8 border-t border-[#FE8505]/15">
            <h3 className="font-serif-title text-2xl sm:text-3xl text-center text-[#1A1A1A] mb-12">
              Qué podés ganar en el proceso
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FFFDF5] border border-[#FE8505]/15 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#FE8505]/40 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#FE8505]/10 text-[#FE8505] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-[#FE8505] group-hover:text-white transition-all duration-300">
                      <IconComponent size={26} />
                    </div>
                    <h4 className="font-serif-title text-xl text-[#1A1A1A] mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECCIÓN 3 — PROGRAMAS
      ============================================================ */}
      <section
        id="programas"
        className="py-20 lg:py-28 bg-[#FFFDF5] relative border-y border-[#FE8505]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FE8505] uppercase block mb-3">
              SERVICIOS TERAPÉUTICOS
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              Dos caminos, un mismo propósito: vos
            </h2>
            <p className="text-base sm:text-lg text-[#6b6b6b]">
              Elegí el programa que resuene con tu momento actual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* PROGRAMA 1 */}
            <div className="bg-[#FFFDE1] rounded-3xl p-8 sm:p-10 border-l-8 border-[#FE8505] border-t border-r border-b border-[#FE8505]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div
                className="absolute -bottom-8 -right-4 font-serif-title text-8xl italic text-[#FE8505]/5 pointer-events-none select-none"
                aria-hidden="true"
              >
                Silla Vacía
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-[#FE8505] uppercase block mb-2">
                  PROGRAMA 1
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl text-[#1A1A1A] mb-4">
                  Encuentros Gestálticos sobre Conflictos Internos
                </h3>

                {/* Metadata tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FE8505]/10 text-[#1A1A1A]">
                    🕐 8 sesiones
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FE8505]/10 text-[#1A1A1A]">
                    ⏱ 1 a 1.5 horas
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FE8505]/10 text-[#1A1A1A]">
                    👤 Individual o grupal
                  </span>
                </div>

                <p className="text-[#3a3a3a] leading-relaxed mb-6">
                  Un espacio de exploración profunda para quienes atraviesan momentos de quiebre,
                  búsqueda de sentido o transición personal. Desde la perspectiva gestáltica,
                  trabajamos con lo que está presente aquí y ahora.
                </p>

                <h4 className="font-semibold text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Este espacio puede acompañarte si atravesás:
                </h4>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Crisis de sentido de vida',
                    'Rupturas emocionales',
                    'Agotamiento profesional (burnout)',
                    'Momentos de transición personal',
                    'Procesos de autoconocimiento y expansión',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#3a3a3a] text-sm sm:text-base">
                      <span className="w-5 h-5 rounded-full bg-[#FE8505]/20 text-[#FE8505] flex items-center justify-center shrink-0 text-xs font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20interesa%20el%20Programa%201:%20Encuentros%20Gest%C3%A1lticos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#FE8505] text-[#FE8505] hover:bg-[#FE8505] hover:text-white font-semibold transition-all duration-300"
              >
                <span>Quiero saber más</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* PROGRAMA 2 */}
            <div className="bg-gradient-to-br from-[#FE8505]/10 via-[#FFFDE1] to-[#FFFDF5] rounded-3xl p-8 sm:p-10 border border-[#FE8505]/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -bottom-8 -right-4 font-serif-title text-7xl italic text-[#FE8505]/5 pointer-events-none select-none"
                aria-hidden="true"
              >
                Propósito
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-[#E52E01] uppercase block mb-2">
                  PROGRAMA 2 · INTEGRATIVO
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl text-[#1A1A1A] mb-4">
                  Programa Híbrido: Sesiones con Propósito
                </h3>

                {/* Metadata tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E52E01]/10 text-[#E52E01]">
                    🕐 8 sesiones
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E52E01]/10 text-[#E52E01]">
                    🔄 Modalidad integrativa
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E52E01]/10 text-[#E52E01]">
                    👤 Individual o grupal
                  </span>
                </div>

                <p className="text-[#3a3a3a] leading-relaxed mb-6">
                  Un recorrido estructurado que combina psicología, trabajo corporal y técnicas
                  complementarias. Cada sesión tiene un enfoque específico y se construye sobre la
                  anterior, generando un proceso de aprendizaje progresivo y personalizado.
                </p>

                <div className="p-4 rounded-xl bg-[#FE8505]/15 border border-[#FE8505]/30 flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧰</span>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    Contás con herramientas prácticas que podés aplicar en tu vida cotidiana.
                  </span>
                </div>

                <h4 className="font-semibold text-sm uppercase tracking-wider text-[#1A1A1A] mb-4">
                  Recorrido de sesiones:
                </h4>
                <div className="relative pl-6 space-y-4 mb-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#FE8505] before:to-[#FE8505]/20">
                  {timelineSteps.map((step) => (
                    <div key={step.num} className="relative">
                      <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#E52E01] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                        {step.num}
                      </span>
                      <div>
                        <strong className="font-serif-title text-base text-[#1A1A1A] block">
                          {step.title}
                        </strong>
                        <p className="text-xs sm:text-sm text-[#6b6b6b] mt-0.5 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20interesa%20el%20Programa%202:%20Sesiones%20con%20Prop%C3%B3sito"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FE8505] hover:bg-[#E52E01] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>Quiero empezar este recorrido</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECCIÓN 4 — GALERÍA & FOLLETO
      ============================================================ */}
      <section id="galeria" className="py-20 lg:py-28 bg-[#FFFDE1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FE8505] uppercase block mb-3">
              GALERÍA
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              Momentos del proceso
            </h2>
            <p className="text-base sm:text-lg text-[#6b6b6b]">
              Una mirada íntima al espacio y materiales que construimos juntos.
            </p>
          </div>

          {/* Interactive Carousel */}
          <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
            <div className="w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-[#1A1A1A] relative group cursor-zoom-in">
              <div
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 flex items-center justify-center relative select-none"
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#1A1A1A]/80 text-white text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm shadow-md">
                        Click para ampliar
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls and Dots */}
            <div className="w-full flex items-center justify-between px-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/90 shadow-md text-[#1A1A1A] hover:bg-[#FE8505] hover:text-white flex items-center justify-center transition-all hover:scale-105 focus:outline-none"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="flex items-center gap-2">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                      idx === currentSlide
                        ? 'w-7 bg-[#FE8505]'
                        : 'w-2.5 bg-[#FE8505]/20 hover:bg-[#FE8505]/50'
                    }`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/90 shadow-md text-[#1A1A1A] hover:bg-[#FE8505] hover:text-white flex items-center justify-center transition-all hover:scale-105 focus:outline-none"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* PDF Brochure Download Banner */}
            <div className="mt-8 w-full bg-[#FFFDF5] border border-[#FE8505]/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FE8505]/10 text-[#FE8505] flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm sm:text-base">
                    Folleto Informativo Completo
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6b6b6b]">
                    Descargá el dossier con el detalle de las 8 sesiones e información de contacto.
                  </p>
                </div>
              </div>

              <a
                href="/SILLA VACIA BROUCHER.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#FE8505] text-white text-xs sm:text-sm font-semibold transition-colors duration-200"
              >
                <Download size={15} />
                <span>Ver / Descargar PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECCIÓN 5 — CTA FINAL
      ============================================================ */}
      <section
        id="contacto"
        className="py-24 lg:py-32 bg-[#E52E01] text-[#FFFDE1] relative overflow-hidden"
      >
        {/* Glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FE8505]/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FFFDE1]/15 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl text-[#FFFDE1] mb-6 leading-tight">
            Empezá tu proceso hoy
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl font-light text-[#FFFDE1]/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            No necesitás tener todo claro para dar el primer paso. Solo necesitás ganas de
            encontrarte.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20gustar%C3%ADa%20coordinar%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#FFFDE1] hover:bg-white text-[#E52E01] font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 animate-ivory-pulse"
            >
              <span>💬 Escribinos por WhatsApp</span>
            </a>
          </div>

          <p className="mt-8 text-sm sm:text-base text-[#FFFDE1]/80 font-medium">
            +54 9 2622 66-6444 · Estamos para acompañarte
          </p>
        </div>
      </section>

      {/* ============================================================
           FOOTER
      ============================================================ */}
      <footer className="bg-[#1A1A1A] text-[#FFFDE1]/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="md:col-span-6 flex flex-col items-start">
              <img src="/logo-w.webp" alt="Silla Vacía" className="w-16 h-auto mb-4" />
              <h3 className="font-serif-title text-2xl text-[#FFFDE1] mb-1">Silla Vacía</h3>
              <p className="text-sm italic text-[#FFFDE1]/60 mb-3">Acompañamiento Terapéutico</p>
              <p className="text-xs text-[#FFFDE1]/50 max-w-sm">
                Enfoque gestáltico e integrativo para procesos de autoconocimiento, transformación y
                bienestar emocional.
              </p>
            </div>

            {/* Links column */}
            <div className="md:col-span-3">
              <h5 className="font-sans-body text-xs font-bold uppercase tracking-widest text-[#FFFDE1] mb-4">
                Navegación
              </h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#hero" className="hover:text-[#FE8505] transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#acerca" className="hover:text-[#FE8505] transition-colors">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#programas" className="hover:text-[#FE8505] transition-colors">
                    Programa 1
                  </a>
                </li>
                <li>
                  <a href="#programas" className="hover:text-[#FE8505] transition-colors">
                    Programa 2
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-[#FE8505] transition-colors">
                    Galería
                  </a>
                </li>
                <li>
                  <a
                    href="/SILLA VACIA BROUCHER.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FE8505] transition-colors"
                  >
                    Folleto PDF
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="md:col-span-3">
              <h5 className="font-sans-body text-xs font-bold uppercase tracking-widest text-[#FFFDE1] mb-4">
                Contacto Directo
              </h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>WhatsApp de atención</span>
                </li>
                <li>
                  <a
                    href="https://wa.me/5492622666444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FE8505] hover:text-[#E52E01] font-semibold transition-colors"
                  >
                    +54 9 2622 66-6444
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFDE1]/50 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Silla Vacía · Estelle Darcy · Todos los derechos reservados.</p>
            <p className="font-serif-title italic text-sm text-[#FE8505]/90">
              “Un espacio para volverte a encontrar.”
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================
           FLOATING WHATSAPP BUTTON
      ============================================================ */}
      <a
        href="https://wa.me/5492622666444?text=Hola%20Estelle,%20me%20gustar%C3%ADa%20consultar%20por%20acompa%C3%B1amiento%20terap%C3%A9utico"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-glow focus:outline-none"
        aria-label="Escribinos por WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.094c-.74-.37-1.685-.74-2.725-1.587-1.215-1.017-2.012-2.27-2.425-2.808a.584.584 0 0 1-.052-.282c.06-.6 1.214-1.484 1.214-1.86a.43.43 0 0 0-.176-.36c-.36-.342-1.214-1.39-1.214-1.86 0-.372.06-.648.282-.83.222-.183.522-.27.83-.27h.246c.282 0 .6.06.918.27.318.21.918 1.146 1.39 1.86.474.714 1.026 1.518 1.482 2.232.456.714.948 1.428 1.428 2.13.282.456.6.83 1.026 1.026.426.198.852.198 1.278 0 .426-.198 1.026-.456 1.482-.83.456-.372.852-.83 1.026-1.278.174-.456.174-.852.174-1.278 0-.456-.174-.852-.456-1.278-.282-.426-1.518-2.232-2.13-3.024-.6-.792-1.518-1.518-2.508-1.518h-1.518c-.6 0-1.214.174-1.696.522-.474.342-1.026.918-1.39 1.518a6.84 6.84 0 0 0-.918 2.232c-.174.792-.174 1.518 0 2.232.174.714.522 1.428 1.026 2.13.522.714 1.214 1.39 1.998 2.052.792.648 1.696 1.278 2.508 1.696.83.426 1.696.648 2.508.648h1.214c.6 0 1.214-.174 1.696-.522.474-.342 1.026-.918 1.39-1.518.282-.474.522-1.026.522-1.518 0-.342-.174-.6-.456-.792zM16.001 5.333c-5.886 0-10.668 4.782-10.668 10.668 0 1.866.498 3.71 1.422 5.323l-1.51 5.51 5.643-1.48a10.62 10.62 0 0 0 5.113 1.302h.005c5.886 0 10.668-4.782 10.668-10.668 0-2.85-1.114-5.526-3.126-7.542-2.012-2.012-4.692-3.113-7.547-3.113z" />
        </svg>
      </a>

      {/* ============================================================
           LIGHTBOX MODAL
      ============================================================ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 hover:bg-[#FE8505] text-white flex items-center justify-center transition-colors focus:outline-none z-10"
            aria-label="Cerrar vista ampliada"
          >
            <X size={24} />
          </button>

          {/* Modal image */}
          <div
            className="max-w-4xl max-h-[85vh] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Navigation Controls */}
          <div
            className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
                )
              }
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 hover:bg-[#FE8505] text-white flex items-center justify-center transition-colors shadow-lg focus:outline-none"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
              }
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 hover:bg-[#FE8505] text-white flex items-center justify-center transition-colors shadow-lg focus:outline-none"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif-title text-[#FFFDE1] text-lg">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
