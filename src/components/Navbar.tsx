import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0d0d12]/80 backdrop-blur-xl border-b border-purple-500/15 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo de la app */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-base shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
            P
          </span>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Plan<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">City</span>
          </span>
        </Link>

        {/* Enlaces principales */}
        <nav className="flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/events" className="hover:text-purple-400 transition-colors">
            Eventos
          </Link>
          <Link href="/categories" className="hover:text-purple-400 transition-colors">
            Categorías
          </Link>
          <Link href="/favorites" className="hover:text-purple-400 transition-colors">
            Favoritos
          </Link>
        </nav>

        {/* Acciones de usuario */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-purple-300 px-3.5 py-1.5 rounded-lg hover:bg-purple-500/10 transition-all"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-4 py-1.5 rounded-xl shadow-lg shadow-purple-950/50 hover:shadow-purple-900/50 transition-all active:scale-[0.98]"
          >
            Registrarse
          </Link>
        </div>

      </div>
    </header>
  );
}