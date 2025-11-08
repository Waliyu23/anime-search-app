import axios, { CancelTokenSource } from 'axios';
import { JIKAN_API_BASE_URL } from '../utils/constants';
import { SearchResponse, AnimeDetailResponse } from '../types/anime.types';

// Create axios instance
const api = axios.create({
  baseURL: JIKAN_API_BASE_URL,
});

// Store cancel token for search requests
let searchCancelToken: CancelTokenSource | null = null;

// Rate limiting - minimum delay between requests (in milliseconds)
let lastRequestTime = 0;
const MIN_REQUEST_DELAY = 1000; // 1 second between requests

const waitForRateLimit = async (): Promise<void> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_DELAY) {
    const waitTime = MIN_REQUEST_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  // Cancel previous request if it exists
  if (searchCancelToken) {
    searchCancelToken.cancel('New search initiated');
  }

  // Create new cancel token
  searchCancelToken = axios.CancelToken.source();

  try {
    // Wait for rate limit
    await waitForRateLimit();

    const response = await api.get<SearchResponse>('/anime', {
      params: {
        q: query,
        page: page,
        sfw: true,
        limit: 24,
      },
      cancelToken: searchCancelToken.token,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request cancelled');
    }
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
    }
    
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  try {
    // Wait for rate limit
    await waitForRateLimit();

    const response = await api.get<AnimeDetailResponse>(`/anime/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
    }
    throw error;
  }
};

export const getTopAnime = async (page: number = 1): Promise<SearchResponse> => {
  try {
    // Wait for rate limit
    await waitForRateLimit();

    const response = await api.get<SearchResponse>('/top/anime', {
      params: {
        page: page,
        limit: 24,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
    }
    throw error;
  }
};