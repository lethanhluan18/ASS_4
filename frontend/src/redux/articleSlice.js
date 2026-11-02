import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch articles'
      );
    }
  }
);

export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await api.post('/articles', articleData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add article'
      );
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/articles/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete article'
      );
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearArticleMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articles.unshift(action.payload);
        state.successMessage = 'Article added successfully!';
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((a) => a._id !== action.payload);
        state.successMessage = 'Article deleted successfully!';
      });
  },
});

export const { clearArticleMessages } = articleSlice.actions;
export default articleSlice.reducer;

