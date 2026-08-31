import { useState } from "react";
import { Code2, Zap, Palette, ArrowRight, Check, Files } from "lucide-react";

export default function App() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npm run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] font-sans flex flex-col justify-between antialiased">
      {/* Top Header */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-[#e6e3dd]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2d2a26] flex items-center justify-center text-[#faf9f6]">
            <Code2 size={18} />
          </div>
          <span className="font-semibold tracking-tight text-lg">React + Vite</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#eae6df] text-[#5e5850]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Listo para desarrollar
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto px-6 py-16 md:py-24 flex-grow flex flex-col justify-center">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight max-w-3xl">
              Tu lienzo en blanco de <span className="font-semibold">React + Vite</span> está listo.
            </h1>
            <p className="text-lg md:text-xl text-[#5e5850] font-light max-w-2xl leading-relaxed">
              Hemos preparado un entorno limpio, optimizado y preconfigurado con las tecnologías más modernas para que comiences a programar sin fricciones.
            </p>
          </div>

          {/* Interactive Starter Card */}
          <div className="bg-white border border-[#e6e3dd] rounded-xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e6e3dd]">
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-[#9c9386] uppercase">Comienza ahora</h3>
                <p className="text-base text-[#5e5850]">Abre <code className="bg-[#f3f0ea] px-1.5 py-0.5 rounded text-sm font-mono text-[#2d2a26]">src/App.tsx</code> y reemplaza este diseño por tu aplicación.</p>
              </div>
              <button
                onClick={copyCommand}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2 bg-[#2d2a26] hover:bg-[#443f39] text-[#faf9f6] rounded-lg text-sm font-medium transition-colors duration-200 active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Files size={16} />
                    <span>Copiar comando de inicio</span>
                  </>
                )}
              </button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#f3f0ea] flex items-center justify-center text-[#2d2a26]">
                  <Zap size={20} />
                </div>
                <h4 className="font-semibold text-base">Vite de Alta Velocidad</h4>
                <p className="text-sm text-[#5e5850] leading-relaxed">
                  Compilación instantánea y desarrollo veloz con el empaquetador moderno por excelencia.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#f3f0ea] flex items-center justify-center text-[#2d2a26]">
                  <Palette size={20} />
                </div>
                <h4 className="font-semibold text-base">Tailwind CSS v4</h4>
                <p className="text-sm text-[#5e5850] leading-relaxed">
                  Estilos fluidos directamente en tus clases de HTML con el motor de diseño más rápido.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#f3f0ea] flex items-center justify-center text-[#2d2a26]">
                  <Code2 size={20} />
                </div>
                <h4 className="font-semibold text-base">TypeScript Activo</h4>
                <p className="text-sm text-[#5e5850] leading-relaxed">
                  Tipado fuerte, autocompletado inteligente y prevención de errores durante el desarrollo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 py-8 border-t border-[#e6e3dd] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9c9386]">
        <div>
          <span>Proyecto Web React+Vite • Desarrollado con Inteligencia</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d2a26] transition-colors">Vite Docs</a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d2a26] transition-colors">React Docs</a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2d2a26] transition-colors">Tailwind CSS Docs</a>
        </div>
      </footer>
    </div>
  );
}

