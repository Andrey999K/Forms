import { describe, expect, test } from 'vitest';
import { FieldTypes } from '@/shared/types';
import { render } from '@testing-library/react';
import { renderField } from '@/shared/utils/renderField';

describe('Check render function renderField', () => {
  test('Check render input', () => {
    const mockInputData = {
      id: '3661a721-359a-4007-ae1b-b7bb86bdb288',
      type: 'input' as FieldTypes, // это нужно чтобы WebStorm не писал, что тип не соответствует
      question: 'Как вас зовут?',
      require: false,
    };

    const { getByRole } = render(renderField(mockInputData));
    const inputElement = getByRole('textbox');
    expect(inputElement.tagName).toBe('INPUT');
  });

  test('Check render textarea', () => {
    const mockInputData = {
      id: 'e5c87edd-85c3-436f-ad8f-992c6e43b621',
      type: 'textarea' as FieldTypes,
      require: false,
      question: 'Почему решили откликнуться на данную вакансию?',
    };

    const { getByRole } = render(renderField(mockInputData));
    const inputElement = getByRole('textbox');
    expect(inputElement.tagName).toBe('TEXTAREA');
  });

  test('Check render radio group', () => {
    const field = {
      id: 'a1454564-bdba-4ec8-8e6c-2ff754eab12e',
      type: 'radio' as FieldTypes,
      require: true,
      question: 'Выберите пол',
      options: [
        { label: 'Мужской', id: '23995334-6ee3-4a39-b117-8aca1580cb5d' },
        { label: 'Женский', id: 'f77548f7-db64-4a52-a9e5-16e4da8b8f45' },
      ],
    };

    const { getByLabelText, container } = render(renderField(field));
    const radioGroup = container.querySelector('.ant-radio-group');
    expect(getByLabelText('Мужской')).toBeInTheDocument();
    expect(getByLabelText('Женский')).toBeInTheDocument();
    expect(radioGroup).toBeInTheDocument();
  });

  test('Check render checkbox group', () => {
    const field = {
      id: 'e5f97cc3-5196-437a-9942-6d3aa6144c38',
      type: 'checkbox' as FieldTypes,
      question: 'Выберите ваши навыки:',
      require: true,
      options: [
        { id: 'd2ff1f40-7cc5-4411-94e1-f74270ef7cdf', label: 'HTML' },
        { id: 'e0356599-2c88-4165-9f67-c1cd55f9f965', label: 'CSS' },
        { id: 'cb8cf04d-ecc4-4aa3-ae0a-22e1b21d4250', label: 'JavaScript' },
      ],
    };

    const { getByLabelText, container } = render(renderField(field));
    const checkboxGroup = container.querySelector('.ant-checkbox-group');
    expect(getByLabelText('HTML')).toBeInTheDocument();
    expect(getByLabelText('CSS')).toBeInTheDocument();
    expect(getByLabelText('JavaScript')).toBeInTheDocument();
    expect(checkboxGroup).toBeInTheDocument();
  });
});
