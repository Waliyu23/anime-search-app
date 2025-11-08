import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getTopAnime } from '../services/jikanApi';
import { Anime } from '../types/anime.types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [animeImages, setAnimeImages] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeImages = async () => {
      try {
        const response = await getTopAnime(1);
        setAnimeImages(response.data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime:', error);
        setLoading(false);
      }
    };

    fetchAnimeImages();
  }, []);

  useEffect(() => {
    if (animeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animeImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animeImages.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? animeImages.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-dark-950">
      {/* Background Slider - Full Screen */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {animeImages[currentIndex] && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={animeImages[currentIndex].images.jpg.large_image_url}
                alt="Anime Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300 border border-white/30 group"
        aria-label="Previous image"
      >
        <FiChevronLeft className="text-white text-2xl group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-300 border border-white/30 group"
        aria-label="Next image"
      >
        <FiChevronRight className="text-white text-2xl group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {animeImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8 shadow-lg'
                : 'bg-white/70 hover:bg-white w-2'
            }`}
          />
        ))}
      </div>

      {/* Search Button - Centered */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => navigate('/search')}
          className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-2xl md:text-3xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <FiSearch className="text-2xl md:text-3xl" />
          Search Anime
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;