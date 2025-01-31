import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnswerCard } from '@/components/FormResponse/AnswerCard/AnswerCard';

describe('AnswerCard', () => {
  test('Check render AnswerCard', async () => {
    const mockData = {
      id: 'f7da33ba-3430-4619-9f4b-fded8d4d311d',
      question: 'Расскажите о себе:',
      answer: 'Текст',
    };

    render(<AnswerCard data={mockData} />);

    expect(screen.getByText('Расскажите о себе:')).toBeInTheDocument();
    expect(screen.getByText('Текст')).toBeInTheDocument();
  });

  test('Check render AnswerCard with many answers', async () => {
    const mockData = {
      question: 'Выберите ваши навыки:',
      id: 'e5f97cc3-5196-437a-9942-6d3aa6144c38',
      answer: ['HTML', 'CSS', 'JavaScript'],
    };

    render(<AnswerCard data={mockData} />);

    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
