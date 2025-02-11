import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomeList } from './HomeList';
import { CardWithCount } from '@/types/card';
import { store } from '@/redux/store.ts';
import { Provider } from 'react-redux';

// Мокаем Firebase конфигурацию
vi.mock('@/utils/firebase/firebaseConfig', () => ({
  auth: {},
  db: {},
}));

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(() => () => {}),
  getAuth: vi.fn(),
}));

describe('HomeCard', () => {
  const mockItems: CardWithCount[] = [
    {
      id: '1',
      title: 'Test Card',
      description: 'This is a test description',
      responseCount: 5,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
    {
      id: '2',
      title: 'Test Card 2',
      description: 'This is a test 2 description',
      responseCount: 9,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  ];

  test('renders HomeList with title and description', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeList items={mockItems} />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // Проверка счетчика ответов
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test 2 description')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument(); // Проверка счетчика ответов
  });
});
