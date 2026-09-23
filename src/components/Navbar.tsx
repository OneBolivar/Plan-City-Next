'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/types/auth.types';

// Suscriptor al storage y al evento personalizado 'auth-change'
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth-change', callback);
  };
}

// Lectura en el cliente
function getSnapshot(): string | null {
  return localStorage.getItem('user');
}

// Lectura en el servidor (SSR)
function getServerSnapshot(): null {
  return null;
}

export default function Navbar() {
  const router = useRouter();

  // useSyncExternalStore sincroniza perfectamente sin useState ni useEffect
  const rawUser = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let user: AuthUser | null = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as AuthUser;
    } catch {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0d0d12]/80 border-b border-purple-500/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300">
            P
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Plan<span className="text-purple-400">City</span>
          </span>
        </Link>

        {/* Links de navegación */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <Link href="/events" className="hover:text-purple-300 transition-colors">
            Eventos
          </Link>
          <Link href="/categories" className="hover:text-purple-300 transition-colors">
            Categorías
          </Link>
          <Link href="/favorites" className="hover:text-purple-300 transition-colors">
            Favoritos
          </Link>
        </nav>

        {/* Zona de autenticación */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161622] border border-purple-500/30 hover:border-purple-500/60 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-600/40 text-purple-300 flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-medium text-slate-200">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Admin
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-medium text-slate-300 hover:text-purple-300 px-3.5 py-1.5 rounded-xl hover:bg-white/5 transition-all"
            >
              Iniciar sesión
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}