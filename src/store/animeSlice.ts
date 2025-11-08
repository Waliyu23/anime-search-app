import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AnimeState } from '../types/anime.types';
import { searchAnime, getAnimeById, getTopAnime } from '../services/jikanApi';
import axios from 'axios';

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  hasSearched: false,
};

// Async thunks
export const fetchSearchResults = createAsyncThunk(
  'anime/fetchSearchResults',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await searchAnime(query, page);
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue('cancelled');
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          return rejectWithValue('You are being rate-limited. Please wait a moment before searching again.');
        }
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch anime');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchTopAnime = createAsyncThunk(
  'anime/fetchTopAnime',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await getTopAnime(page);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          return rejectWithValue('You are being rate-limited. Please wait a moment before trying again.');
        }
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch top anime');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchAnimeDetails = createAsyncThunk(
  'anime/fetchAnimeDetails',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getAnimeById(id);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          return rejectWithValue('You are being rate-limited. Please wait a moment before trying again.');
        }
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch anime details');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    // Search results
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasSearched = true;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'cancelled') {
          state.error = action.payload as string;
        }
      });

    // Top anime
    builder
      .addCase(fetchTopAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasSearched = true;
      })
      .addCase(fetchTopAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Anime details
    builder
      .addCase(fetchAnimeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setCurrentPage, clearError, clearSelectedAnime } = animeSlice.actions;
export default animeSlice.reducer;