import { CardWithCount } from '@/types/card';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { HomeCard } from './HomeCard';
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
  const mockItem: CardWithCount = {
    id: '1',
    title: 'Test Card',
    description: 'This is a test description',
    responseCount: 5,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  test('renders HomeCard with title and description', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeCard item={mockItem} />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // Проверка счетчика ответов
  });

  // test('calls onDelete when delete button is clicked', () => {
  //   render(
  //     <Router>
  //       <HomeCard item={mockItem} onDelete={mockOnDelete} isDeleting={true} />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByTestId('delete-button'));
  //   expect(mockOnDelete).toHaveBeenCalledWith('1'); // Проверка, что функция onDelete была вызвана с правильным id
  // });
});
