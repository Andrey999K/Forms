import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { UserFormInput } from './UserFormInput';

describe('UserFormInput', () => {
  const Wrapper = ({
    name,
    placeholder,
  }: {
    name: string;
    placeholder: 'Email' | 'Пароль' | 'Имя' | 'Фамилия';
  }) => {
    const { control } = useForm();
    return (
      <UserFormInput
        name={name}
        control={control}
        rules={{ required: 'Поле обязательно' }}
        placeholder={placeholder}
        type="text"
      />
    );
  };

  test('renders input with placeholder', () => {
    render(<Wrapper name="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('shows validation error on blur when input is empty', async () => {
    render(<Wrapper name="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');

    fireEvent.blur(input);

    const formItem = input.closest('.ant-form-item');
    const errorMessage = formItem?.querySelector('.ant-form-item-explain-error');

    if (errorMessage) {
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.textContent).toBe('Поле обязательно');
    }
  });

  test('does not show validation error when input is filled', async () => {
    render(<Wrapper name="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.blur(input);

    const formItem = input.closest('.ant-form-item');
    const errorMessage = formItem?.querySelector('.ant-form-item-explain-error');

    expect(errorMessage).toBeNull();
    expect(input).toHaveValue('test@example.com');
  });
});
