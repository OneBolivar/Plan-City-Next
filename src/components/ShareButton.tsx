//Client Server

'use client';

import { useState } from 'react';
import { ShareButtonProps } from '@/types/share.types';

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('No se pudo copiar el enlace:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 flex items-center gap-2"
    >
      <span>{copied ? '✓' : '🔗'}</span>
      <span>{copied ? '¡Enlace copiado!' : 'Compartir'}</span>
    </button>
  );
}