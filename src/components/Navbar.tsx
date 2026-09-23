'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/types/auth.types';

export default function Navbar() {
  const router = useRouter();

  // Función auxiliar para leer localStorage de forma segura
  const getStoredUser = (): AuthUser | null => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  useEffect(() => {
    // Sincroniza el usuario si ocurre un cambio en la sesión
    const syncUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('storage', syncUser);
    window.addEventListener('auth-change', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('auth-change', syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
    router.refresh();
  };

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

        {/* Acciones de usuario según autenticación */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#161622] border border-purple-500/30 hover:border-purple-500/60 transition-all text-xs text-slate-200"
              >
                <span className="w-6 h-6 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300 text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Admin
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

      </div>
    </header>
  );
}