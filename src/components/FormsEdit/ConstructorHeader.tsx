import { ConstructorForm } from '@/types';
import { FC } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { EditableText } from './EditableText';
import { EditableTextarea } from './EditableTextarea';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: { value: string; name: string }) => void;
  onError: (id: string, updates: boolean) => void;
};

export const ConstructorHeader: FC<Props> = (props) => {
  const { constructor, onChangeForm, onError } = props;
  return (
    <GlassWrapper className="flex flex-col gap-2 p-4">
      <EditableText
        value={constructor.title}
        name="title"
        placeholder="Название"
        onChange={onChangeForm}
        onError={onError}
        size="large"
      >
        <div className="text-start p-[5px] px-[11px] border border-transparent hover:border-colorPrimary rounded">
          <h1 className="text-lg font-medium">{constructor.title}</h1>
        </div>
      </EditableText>
      <EditableTextarea
        value={constructor.description}
        name="description"
        placeholder="Описание"
        onChange={onChangeForm}
        onError={onError}
      >
        <div className="text-start p-[5px] px-[11px] border border-transparent hover:border-colorPrimary rounded">
          <h2 className="text-sm text-gray-600">{constructor.description}</h2>
        </div>
      </EditableTextarea>
    </GlassWrapper>
  );
};
