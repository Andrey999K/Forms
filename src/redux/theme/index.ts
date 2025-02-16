import { themeSlice } from './ThemeSlice';

export const {
  reducer: themeReducer,
  actions: { setTheme, toggleTheme },
} = themeSlice;
