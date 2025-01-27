import { FC } from 'react';
import { ConstructorNameModal } from './ConstructorNameModal';
import { ConstructorForm } from '@/shared/types';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: { value: string; name: string }) => void;
};

export const ConstructorHeader: FC<Props> = ({ constructor, onChangeForm }) => {
  return (
    <GlassWrapper className="flex flex-col gap-2 p-4">
      <ConstructorNameModal
        value={constructor.title}
        name="title"
        title="Название"
        onChange={onChangeForm}
      >
        <h1 className="text-lg font-medium">{constructor.title}</h1>
      </ConstructorNameModal>
      <ConstructorNameModal
        value={constructor.description}
        name="description"
        title="Описание"
        onChange={onChangeForm}
      >
        <h2 className="text-sm text-gray-600">{constructor.description}</h2>
      </ConstructorNameModal>
    </GlassWrapper>
  );
};
