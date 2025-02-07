import { ConstructorForm } from '@/types';
import { FC } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { EditableText } from './EditableText';
import { EditableTextarea } from './EditableTextarea';
import { Typography } from 'antd';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: { value: string; name: string }) => void;
  errors: { [key: string]: string[] };
};

export const ConstructorHeader: FC<Props> = (props) => {
  const { constructor, onChangeForm, errors } = props;
  return (
    <GlassWrapper className="flex flex-col gap-2 p-4">
      <EditableText
        value={constructor.title}
        name="title"
        placeholder="Название"
        onChange={onChangeForm}
        errors={errors}
        size="large"
      >
        <div className="text-start p-[5px] px-[11px] border border-transparent hover:border-primary rounded">
          <Typography.Title level={4} style={{ fontSize: '1.125rem', fontWeight: 500, margin: 0 }}>
            {constructor.title}
          </Typography.Title>
        </div>
      </EditableText>
      <EditableTextarea
        value={constructor.description}
        name="description"
        placeholder="Описание"
        onChange={onChangeForm}
        errors={errors}
      >
        <div className="text-start p-[5px] px-[11px] border border-transparent hover:border-primary rounded">
          <Typography.Text type="secondary" style={{ fontSize: '0.875rem' }}>
            {constructor.description}
          </Typography.Text>
        </div>
      </EditableTextarea>
    </GlassWrapper>
  );
};
