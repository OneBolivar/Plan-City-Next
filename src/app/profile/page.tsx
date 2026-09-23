'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/types/auth.types';

export default function ProfilePage() {
  const router = useRouter();

  // Inicialización limpia desde localStorage sin provocar re-renders en cascada
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    try {
      return JSON.parse(saved) as AuthUser;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
    router.refresh();
  };

  if (!user) {
    return (
      <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-12 px-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-md">
          <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl mb-4">
            🔒
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Acceso Restringido</h2>
          <p className="text-sm text-slate-400 mb-6">
            Debes iniciar sesión para consultar la información de tu perfil.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-purple-950/40"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-12 md:py-16">
      {/* Resplandor violeta ambiental */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        {/* Cabecera */}
        <div className="border-b border-purple-500/15 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Perfil de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
              Usuario
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Administra tus credenciales y preferencias en la plataforma.
          </p>
        </div>

        {/* Tarjeta de Información Principal */}
        <section className="bg-[#161622]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-xl shadow-purple-950/30">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800/80 pb-6 mb-6">
            
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-violet-600/20 border border-purple-500/40 flex items-center justify-center text-3xl font-black text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>

            {/* Datos primarios */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1">
                <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-mono">{user.email}</p>
              {user.createdAt && (
                <p className="text-xs text-slate-500 mt-2">
                  Miembro desde:{' '}
                  {new Date(user.createdAt).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Detalles Técnicos de la Cuenta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#0d0d12]/60 border border-slate-800">
              <span className="text-slate-500 block mb-1">ID DE USUARIO</span>
              <span className="text-slate-300 truncate block select-all">{user.id}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12]/60 border border-slate-800">
              <span className="text-slate-500 block mb-1">TIPO DE PRIVILEGIOS</span>
              <span className="text-slate-300 block">
                {user.role === 'admin' ? 'Control de Administrador Total' : 'Usuario Estándar'}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/favorites"
              className="px-4 py-2 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-300 text-xs font-medium transition-all"
            >
              ⭐ Ver mis eventos guardados
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium transition-all cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}