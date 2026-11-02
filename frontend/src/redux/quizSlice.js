import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuizQuestions',
  async (_, { rejectWithValue }) => {
    try {
      // First try to fetch the default quiz or questions
      const res = await api.get('/questions');
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load quiz'
      );
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentIndex: 0,
    selectedOption: null,
    score: 0,
    isCompleted: false,
    loading: false,
    error: null,
  },
  reducers: {
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    submitCurrentAnswer: (state) => {
      if (state.selectedOption === null) return;

      const currentQ = state.questions[state.currentIndex];
      if (currentQ) {
        if (state.selectedOption === currentQ.correctAnswerIndex) {
          state.score += 1;
        }
      }

      if (state.currentIndex + 1 < state.questions.length) {
        state.currentIndex += 1;
        state.selectedOption = null;
      } else {
        state.isCompleted = true;
      }
    },
    restartQuiz: (state) => {
      state.currentIndex = 0;
      state.score = 0;
      state.isCompleted = false;
      state.selectedOption = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        // Make sure order is consistent
        state.questions = action.payload;
        state.currentIndex = 0;
        state.score = 0;
        state.isCompleted = false;
        state.selectedOption = null;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectOption, submitCurrentAnswer, restartQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;

