import Link from 'next/link';

export default function HomePage() {
  const quickCategories = [
    { name: 'Música & Conciertos', icon: '🎵', count: '14 eventos', href: '/categories?type=music' },
    { name: 'Tecnología & Hackathons', icon: '⚡', count: '8 eventos', href: '/categories?type=tech' },
    { name: 'Gastronomía & Bares', icon: '🍸', count: '21 eventos', href: '/categories?type=food' },
    { name: 'Arte & Cultura', icon: '🎭', count: '6 eventos', href: '/categories?type=art' },
  ];

  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center">
      {/* Luces y auras de fondo (Glow ambiental) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-96 -right-20 w-[400px] h-[400px] bg-violet-800/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        
        {/* Badge animado */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-xs font-medium text-purple-300 tracking-wide">
            Descubre lo que pasa en tu ciudad
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
          Explora, vive y conecta con los mejores{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
            eventos urbanos
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          PlanCity te acerca a conciertos, ferias, meetups de tecnología y vida nocturna en tiempo real. Todo en un solo lugar.
        </p>

        {/* Botones de acción principales */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/events"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-xl shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Explorar Eventos
          </Link>
          <Link
            href="/categories"
            className="px-6 py-3 bg-[#161622]/80 hover:bg-[#1f1f2e] text-slate-200 hover:text-white border border-purple-500/20 hover:border-purple-500/40 font-medium rounded-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Ver Categorías
          </Link>
        </div>

        {/* Métricas rápidas */}
        <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 border-y border-purple-500/10 py-6 w-full max-w-xl">
          <div>
            <span className="block text-2xl font-bold text-white tracking-tight">+50</span>
            <span className="text-xs text-slate-400 font-medium">Lugares activos</span>
          </div>
          <div className="border-x border-purple-500/10 px-4">
            <span className="block text-2xl font-bold text-purple-400 tracking-tight">+120</span>
            <span className="text-xs text-slate-400 font-medium">Eventos este mes</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white tracking-tight">100%</span>
            <span className="text-xs text-slate-400 font-medium">Comunidad local</span>
          </div>
        </div>
      </section>

      {/* Grid de Categorías Populares */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Categorías Populares</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Filtra la ciudad según tu estilo de vida</p>
          </div>
          <Link
            href="/categories"
            className="text-xs sm:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group"
          >
            Todas las categorías
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group p-5 bg-[#161622]/60 hover:bg-[#1c1c2b] border border-purple-500/15 hover:border-purple-500/40 rounded-2xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-2.5 rounded-xl bg-[#0d0d12]/60 border border-purple-500/10 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-slate-500 group-hover:text-purple-400 transition-colors text-sm">↗</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-500 mt-1 block">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}