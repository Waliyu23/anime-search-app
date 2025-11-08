import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../types/anime.types';
import { FiStar, FiPlay, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer h-full"
      onClick={handleClick}
    >
      <div className="relative h-full glass-dark rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-dark-900">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent"></div>
          
          {/* Hover Play Button */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <FiPlay className="text-white text-3xl ml-1" />
              </div>
            </div>
          </div>

          {/* Score Badge */}
          {anime.score && (
            <div className="absolute top-4 right-4 glass px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-xl">
              <FiStar className="text-yellow-400 text-sm" />
              <span className="font-bold text-white">{anime.score.toFixed(1)}</span>
            </div>
          )}

          {/* Type Badge */}
          {anime.type && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <span className="text-xs font-bold text-white uppercase tracking-wide">{anime.type}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 min-h-[3.5rem]">
            {anime.title}
          </h3>

          {/* English Title */}
          {anime.title_english && anime.title_english !== anime.title && (
            <p className="text-gray-400 text-sm line-clamp-1 font-medium">
              {anime.title_english}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {anime.episodes && (
              <span className="px-3 py-1 glass text-blue-400 text-xs rounded-lg font-semibold">
                {anime.episodes} eps
              </span>
            )}
            {anime.year && (
              <span className="px-3 py-1 glass text-purple-400 text-xs rounded-lg font-semibold flex items-center gap-1">
                <FiCalendar className="text-xs" />
                {anime.year}
              </span>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {anime.synopsis}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;