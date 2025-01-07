import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorFormBuilder } from '@/components/formsEdit/ConstructorFormBuilder';
import { ConstructorField, ConstructorForm, FieldType } from '@/types';
import { toast } from 'react-toastify';

const initConstructor: ConstructorForm = {
  id: uuidv4(),
  createdAt: new Date().getTime(),
  title: 'Название формы',
  description: 'Описание формы',
  fields: [],
};

export const FormsEdit: FC = () => {
  const [constructor, setConstructor] = useState<ConstructorForm>(initConstructor);
  const navigate = useNavigate();

  const handleDropField = (type: FieldType, index?: number) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newField: ConstructorField = {
        id: uuidv4(),
        type,
        question: '',
        require: false,
      };
      const newFields = [...fields];
      if (index !== undefined) {
        newFields.splice(index, 0, newField);
      } else {
        newFields.push(newField);
      }
      return { ...prev, fields: newFields };
    });
  };

  const moveField = (dragIndex: number, hoverIndex: number) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newFields = [...fields];
      const [removed] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, removed);
      return { ...prev, fields: newFields };
    });
  };

  const updateField = (id: string, updates: Partial<ConstructorField>) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newFields = fields.map((field) => (field.id === id ? { ...field, ...updates } : field));
      return { ...prev, fields: newFields };
    });
  };

  const removeField = (id: string) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newFields = fields.filter((field) => field.id !== id);
      return { ...prev, fields: newFields };
    });
  };

  const handleSaveForms = () => {
    console.log('handleSaveForms', constructor);

    // if (isError) {
    //   toast.error('Ошибка сохранения');
    //   return;
    // }
    toast.success('Сохранено успешно');
  };
  const handleRemoveForms = () => {
    setConstructor((prev) => ({ ...prev, fields: [] }));
    // if (isError) {
    //   toast.error('Ошибка при удалении');
    //   return;
    // }
    toast.success('Удалено успешно');
    navigate('/');
  };

  const handleChangeForm = ({ value, name }: { value: string; name: string }) => {
    console.log('handleChangeForm', { value, name });

    setConstructor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ConstructorFormBuilder
      constructor={constructor}
      onSaveConstructor={handleSaveForms}
      onRemoveConstructor={handleRemoveForms}
      onDropField={handleDropField}
      onMoveField={moveField}
      onRemoveField={removeField}
      onUpdateField={updateField}
      onChangeForm={handleChangeForm}
    />
  );
};
