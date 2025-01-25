import '@testing-library/react';
import '@testing-library/user-event';
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

// Мокаем matchMedia
global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // Добавляем мок для addListener
  removeListener: vi.fn(), // Добавляем мок для removeListener
  addEventListener: vi.fn(), // Добавляем мок для addEventListener
  removeEventListener: vi.fn(), // Добавляем мок для removeEventListener
  dispatchEvent: vi.fn(), // Добавляем мок для dispatchEvent
}));

// Очищаем моки после каждого теста
afterEach(() => {
  vi.clearAllMocks();
});
