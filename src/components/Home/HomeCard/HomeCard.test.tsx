import { CardWithCount } from '@/types/card';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { HomeCard } from './HomeCard';

describe('HomeCard', () => {
  const mockItem: CardWithCount = {
    id: '1',
    title: 'Test Card',
    description: 'This is a test description',
    responseCount: 5,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  const mockOnDelete = vi.fn();

  test('renders HomeCard with title and description', () => {
    render(
      <Router>
        <HomeCard item={mockItem} onDelete={mockOnDelete} isDeleting={false} />
      </Router>
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
