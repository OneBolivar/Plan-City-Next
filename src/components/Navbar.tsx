import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo de la app */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            P
          </span>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Plan<span className="text-purple-600">City</span>
          </span>
        </Link>

        {/* Enlaces principales */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/events" className="hover:text-purple-600 transition-colors">
            Eventos
          </Link>
          <Link href="/categories" className="hover:text-purple-600 transition-colors">
            Categorías
          </Link>
          <Link href="/favorites" className="hover:text-purple-600 transition-colors">
            Favoritos
          </Link>
        </nav>

        {/* Acciones de usuario */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-purple-600 px-3 py-1.5 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            Registrarse
          </Link>
        </div>

      </div>
    </header>
  );
}