//Client Server

'use client';

import { useState } from 'react';
import { FavoriteButtonProps } from '@/types/favorite.types';

export default function FavoriteButton({
  eventId,
  initialIsFavorite = false,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    console.log(`Evento ${eventId} marcado como favorito:`, !isFavorite);
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
        isFavorite
          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
          : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
      }`}
    >
      {isFavorite ? '★ En Favoritos' : '☆ Agregar a Favoritos'}
    </button>
  );
}