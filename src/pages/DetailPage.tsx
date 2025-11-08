import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetails, clearSelectedAnime } from '../store/animeSlice';
import ErrorMessage from '../components/ErrorMessage';
import { 
  FiArrowLeft, 
  FiStar, 
  FiCalendar, 
  FiTv, 
  FiClock,
  FiUsers,
  FiHeart,
  FiTrendingUp,
  FiHome
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetails(parseInt(id, 10)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate('/search');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    if (id) {
      dispatch(fetchAnimeDetails(parseInt(id, 10)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 text-xl">Loading anime details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-xl hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 group border border-white/10"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Search
            </button>
            
            <button
              onClick={handleHome}
              className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <FiHome />
              Home
            </button>
          </div>
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!selectedAnime) {
    return null;
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Navigation Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-xl hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 group border border-white/10"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Search
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleHome}
            className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <FiHome />
            Home
          </motion.button>
        </div>
      </div>

      {/* Hero Section with Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            backgroundImage: `url(${selectedAnime.images.jpg.large_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <img
                    src={selectedAnime.images.jpg.large_image_url}
                    alt={selectedAnime.title}
                    className="relative rounded-3xl w-full shadow-2xl"
                  />
                </div>

                {/* Stats Cards */}
                <div className="mt-6 space-y-3">
                  {selectedAnime.score && (
                    <div className="glass-dark rounded-xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-2">
                        <FiStar className="text-yellow-400 text-xl" />
                        <span className="text-gray-300">Score</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{selectedAnime.score.toFixed(2)}</span>
                    </div>
                  )}
                  {selectedAnime.rank && (
                    <div className="glass-dark rounded-xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className="text-purple-400 text-xl" />
                        <span className="text-gray-300">Rank</span>
                      </div>
                      <span className="text-2xl font-bold text-white">#{selectedAnime.rank}</span>
                    </div>
                  )}
                  {selectedAnime.popularity && (
                    <div className="glass-dark rounded-xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-2">
                        <FiTrendingUp className="text-blue-400 text-xl" />
                        <span className="text-gray-300">Popularity</span>
                      </div>
                      <span className="text-xl font-bold text-white">#{selectedAnime.popularity}</span>
                    </div>
                  )}
                  {selectedAnime.members && (
                    <div className="glass-dark rounded-xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-blue-400 text-xl" />
                        <span className="text-gray-300">Members</span>
                      </div>
                      <span className="text-lg font-bold text-white">{selectedAnime.members.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedAnime.favorites && (
                    <div className="glass-dark rounded-xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-2">
                        <FiHeart className="text-pink-400 text-xl" />
                        <span className="text-gray-300">Favorites</span>
                      </div>
                      <span className="text-lg font-bold text-white">{selectedAnime.favorites.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                {selectedAnime.title}
              </h1>

              {selectedAnime.title_english && selectedAnime.title_english !== selectedAnime.title && (
                <h2 className="text-2xl text-gray-300 mb-2">{selectedAnime.title_english}</h2>
              )}

              {selectedAnime.title_japanese && (
                <h3 className="text-xl text-gray-400 mb-6">{selectedAnime.title_japanese}</h3>
              )}

              {/* Rating Stars */}
              {selectedAnime.score && selectedAnime.scored_by && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-2xl ${
                          i < Math.round(selectedAnime.score! / 2)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-lg">
                    ({selectedAnime.scored_by.toLocaleString()} reviews)
                  </span>
                </div>
              )}

              {/* Info Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedAnime.type && (
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg">
                    {selectedAnime.type}
                  </span>
                )}
                {selectedAnime.status && (
                  <span className="px-4 py-2 glass-dark text-white rounded-xl font-semibold border border-white/10">
                    {selectedAnime.status}
                  </span>
                )}
                {selectedAnime.episodes && (
                  <span className="px-4 py-2 glass-dark text-white rounded-xl font-semibold flex items-center gap-2 border border-white/10">
                    <FiTv />
                    {selectedAnime.episodes} Episodes
                  </span>
                )}
                {selectedAnime.duration && (
                  <span className="px-4 py-2 glass-dark text-white rounded-xl font-semibold flex items-center gap-2 border border-white/10">
                    <FiClock />
                    {selectedAnime.duration}
                  </span>
                )}
                {selectedAnime.season && selectedAnime.year && (
                  <span className="px-4 py-2 glass-dark text-white rounded-xl font-semibold flex items-center gap-2 border border-white/10">
                    <FiCalendar />
                    {selectedAnime.season} {selectedAnime.year}
                  </span>
                )}
                {selectedAnime.rating && (
                  <span className="px-4 py-2 glass-dark text-orange-400 rounded-xl font-semibold border border-orange-500/30">
                    {selectedAnime.rating}
                  </span>
                )}
              </div>

              {/* Synopsis */}
              {selectedAnime.synopsis && (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                      Synopsis
                    </h2>
                    <div className="glass-dark rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-300 text-lg leading-relaxed">{selectedAnime.synopsis}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Background */}
              {selectedAnime.background && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Background</h2>
                  <div className="glass-dark rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-300 leading-relaxed">{selectedAnime.background}</p>
                  </div>
                </div>
              )}

              {/* Genres & Themes */}
              {selectedAnime.genres.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Genres</h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedAnime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl font-semibold"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedAnime.themes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Themes</h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedAnime.themes.map((theme) => (
                      <span
                        key={theme.mal_id}
                        className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl font-semibold"
                      >
                        {theme.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedAnime.demographics.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Demographics</h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedAnime.demographics.map((demo) => (
                      <span
                        key={demo.mal_id}
                        className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl font-semibold"
                      >
                        {demo.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Studios & Producers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedAnime.studios.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-3">Studios</h2>
                    <div className="glass-dark rounded-xl p-4 border border-white/10">
                      {selectedAnime.studios.map((studio, index) => (
                        <p key={studio.mal_id} className="text-gray-300">
                          {index > 0 && ', '}
                          {studio.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAnime.producers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-3">Producers</h2>
                    <div className="glass-dark rounded-xl p-4 border border-white/10">
                      {selectedAnime.producers.slice(0, 5).map((producer, index) => (
                        <p key={producer.mal_id} className="text-gray-300">
                          {index > 0 && ', '}
                          {producer.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedAnime.licensors.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Licensors</h2>
                  <div className="glass-dark rounded-xl p-4 border border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {selectedAnime.licensors.map((licensor) => (
                        <span
                          key={licensor.mal_id}
                          className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm font-semibold"
                        >
                          {licensor.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Trailer */}
              {selectedAnime.trailer.embed_url && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                    Trailer
                  </h2>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        src={selectedAnime.trailer.embed_url}
                        title="Anime Trailer"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Aired Dates */}
              {selectedAnime.aired.string && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Aired</h2>
                  <div className="glass-dark rounded-xl p-4 border border-white/10">
                    <p className="text-gray-300">{selectedAnime.aired.string}</p>
                  </div>
                </div>
              )}

              {/* Broadcast */}
              {selectedAnime.broadcast.string && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Broadcast</h2>
                  <div className="glass-dark rounded-xl p-4 border border-white/10">
                    <p className="text-gray-300">{selectedAnime.broadcast.string}</p>
                  </div>
                </div>
              )}

              {/* Source */}
              {selectedAnime.source && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Source</h2>
                  <div className="glass-dark rounded-xl p-4 border border-white/10">
                    <p className="text-gray-300">{selectedAnime.source}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">
            Powered by <span className="text-gradient-purple font-bold">Jikan API</span> • Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DetailPage;