import React from 'react';
import AnimeCard from './AnimeCard';
import { Anime } from '../types/anime.types';

interface AnimeGridProps {
  animeList: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animeList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeGrid;