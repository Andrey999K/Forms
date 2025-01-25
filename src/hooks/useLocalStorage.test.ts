import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initialValues';

  beforeEach(() => {
    localStorage.clear(); // Очистка localStorage перед каждым тестом
  });

  it('должен обновлять значение в localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, initialValue));

    act(() => {
      result.current.update('newValue');
    });

    expect(result.current.value).toBe('newValue');
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });

  it('должен удалять значение из localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, initialValue));

    act(() => {
      result.current.remove();
    });

    expect(result.current.value).toBe(null);
    expect(localStorage.getItem(key)).toBe(null);
  });
});
