import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AnimeGrid from '../components/AnimeGrid';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchSearchResults,
  fetchTopAnime,
  setSearchQuery,
  setCurrentPage,
  clearError,
} from '../store/animeSlice';
import { FiTrendingUp, FiZap, FiHome } from 'react-icons/fi';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchResults,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    hasSearched,
  } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (!hasSearched) {
      dispatch(fetchTopAnime(1));
    }
  }, [dispatch, hasSearched]);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
      dispatch(setCurrentPage(1));
      if (query.trim()) {
        dispatch(fetchSearchResults({ query: query.trim(), page: 1 }));
      } else {
        dispatch(fetchTopAnime(1));
      }
    },
    [dispatch]
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (searchQuery.trim()) {
      dispatch(fetchSearchResults({ query: searchQuery.trim(), page }));
    } else {
      dispatch(fetchTopAnime(page));
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    if (searchQuery.trim()) {
      dispatch(fetchSearchResults({ query: searchQuery.trim(), page: currentPage }));
    } else {
      dispatch(fetchTopAnime(currentPage));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header with Back Button */}
      <div className="border-b border-white/5 backdrop-blur-xl sticky top-0 z-50 bg-dark-950/80">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <FiHome className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-12">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Title */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4 animate-fade-in">
              <FiZap className="text-yellow-400" />
              <span className="text-sm font-semibold text-gray-300">Discover Amazing Anime</span>
            </div>
            
            <h1 className="font-black tracking-tighter animate-slide-down">
              <span className="text-gradient-purple">Anime</span>
              <span className="text-white"> Search</span>
            </h1>
            
            <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto animate-slide-up">
              Explore thousands of anime titles and find your next obsession
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

          {/* Info Banner */}
          {!searchQuery && !loading && (
            <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
              <div className="glass-dark rounded-2xl p-5 flex items-center gap-4 border-l-4 border-purple-500">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <FiTrendingUp className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Top Trending Anime</h3>
                  <p className="text-gray-400">
                    Currently showing the most popular anime. Start typing to search for specific titles!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-20">
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingSkeleton />
        ) : searchResults.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="max-w-md w-full glass-dark rounded-3xl p-10 text-center animate-scale-in">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-white mb-3">No Results Found</h3>
              <p className="text-gray-400 text-lg">
                We couldn't find any anime matching your search. Try different keywords!
              </p>
            </div>
          </div>
        ) : (
          <>
            <AnimeGrid animeList={searchResults} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
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

export default SearchPage;