import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '@/components/FormsEdit/Sidebar';
import { ConstructorForm, FieldTypes } from '@/types';
import { describe, expect, test, vi } from 'vitest';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { MultiBackend } from 'react-dnd-multi-backend';

const mockConstructor: ConstructorForm = {
  id: '1',
  title: 'Test Form',
  description: 'Test Description',
  tags: [],
  timer: '',
  fields: [],
  userId: 'user-123',
};

const mockConstructorWithFields: ConstructorForm = {
  ...mockConstructor,
  fields: [{ id: 'field-1', type: FieldTypes.INPUT, require: false, question: 'Test Question' }],
};

describe('Sidebar Component', () => {
  test('Save button should be disabled when no fields exist', () => {
    render(
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Sidebar
          constructor={mockConstructor}
          isCreating={false}
          isUpdating={false}
          isDeleting={false}
          isError={false}
          isNew={true}
          onSaveConstructor={vi.fn()}
          onRemoveConstructor={vi.fn()}
          onChangeForm={vi.fn()}
        />
      </DndProvider>
    );
    const saveButton = screen.getByRole('button', { name: /Сохранить форму/i });
    expect(saveButton).toBeDisabled();
  });

  test('Save button should be enabled when fields exist', () => {
    render(
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Sidebar
          constructor={mockConstructorWithFields}
          isCreating={false}
          isUpdating={false}
          isDeleting={false}
          isError={false}
          isNew={true}
          onSaveConstructor={vi.fn()}
          onRemoveConstructor={vi.fn()}
          onChangeForm={vi.fn()}
        />
      </DndProvider>
    );
    const saveButton = screen.getByText(/Сохранить форму/i);
    expect(saveButton).not.toBeDisabled();
  });

  test('Calls onSaveConstructor when save button is clicked', () => {
    const mockSave = vi.fn();
    render(
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Sidebar
          constructor={mockConstructorWithFields}
          isCreating={false}
          isUpdating={false}
          isDeleting={false}
          isError={false}
          isNew={true}
          onSaveConstructor={mockSave}
          onRemoveConstructor={vi.fn()}
          onChangeForm={vi.fn()}
        />
      </DndProvider>
    );
    const saveButton = screen.getByText(/Сохранить форму/i);
    fireEvent.click(saveButton);
    expect(mockSave).toHaveBeenCalled();
  });

  test('Calls onSaveConstructor when updating form', () => {
    const mockSave = vi.fn();
    render(
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Sidebar
          constructor={{ ...mockConstructorWithFields, updatedAt: Date.now() }}
          isCreating={false}
          isUpdating={false}
          isDeleting={false}
          isError={false}
          isNew={false}
          onSaveConstructor={mockSave}
          onRemoveConstructor={vi.fn()}
          onChangeForm={vi.fn()}
        />
      </DndProvider>
    );
    const updateButton = screen.getByText(/Обновить форму/i);
    fireEvent.click(updateButton);
    expect(mockSave).toHaveBeenCalled();
  });
});
