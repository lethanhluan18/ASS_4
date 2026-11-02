import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import questionReducer from './questionSlice';
import quizReducer from './quizSlice';
import articleReducer from './articleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    quiz: quizReducer,
    articles: articleReducer,
  },
});

export default store;

