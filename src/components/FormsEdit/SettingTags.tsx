import { ConstructorForm, HandleChangeForm, Tag as TagType } from '@/types';
import { getUUID } from '@/utils/getUUID';
import { ColorPicker, Select, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
};

type CustomTagProps = {
  label: React.ReactNode;
  value: string;
  closable: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const MAX_TAG_DISPLAY_LENGTH = 20;
const DEFAULT_COLOR = '#fa9145';

export const SettingTags: React.FC<Props> = ({ constructor, onChangeForm }) => {
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const truncateLabel = (label: string) =>
    label.length > MAX_TAG_DISPLAY_LENGTH ? `${label.slice(0, MAX_TAG_DISPLAY_LENGTH)}...` : label;

  const handleSelect = (value: string) => {
    const newTag: TagType = {
      id: getUUID(),
      label: value,
      color: DEFAULT_COLOR,
    };

    onChangeForm({
      value: [...constructor.tags, newTag],
      name: 'tags',
    });
  };

  const handleChange = (selectedValues: string[]) => {
    const selectedTags = constructor.tags.filter((tag) => selectedValues.includes(tag.id));
    onChangeForm({ value: selectedTags, name: 'tags' });
  };

  const handleColorChange = (id: string, color: string) => {
    const updatedTags = constructor.tags.map((tag) => {
      if (tag.id === id) {
        return { ...tag, color };
      }
      return tag;
    });

    onChangeForm({ value: updatedTags, name: 'tags' });
  };

  const handleTagClick = (id: string) => {
    setEditingTagId((prev) => (prev === id ? null : id));
  };

  const TagContent = ({ label, value, closable, onClose }: CustomTagProps) => {
    const selectedTag = constructor.tags.find((tag) => tag.id === value);
    const isEditing = editingTagId === value;

    const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <div className="flex items-center m-[2px]">
        {isEditing && (
          <ColorPicker
            value={selectedTag?.color ?? DEFAULT_COLOR}
            onChange={(color) => handleColorChange(value, color.toHexString())}
            size="small"
            className="border-none p-1"
          />
        )}
        <Tag
          color={selectedTag?.color ?? DEFAULT_COLOR}
          onMouseDown={handleMouseDown}
          closable={closable}
          onClose={onClose}
          onClick={() => handleTagClick(value)}
          className="mr-0"
        >
          <Tooltip title={label}>
            {typeof label === 'string' ? truncateLabel(label) : label}
          </Tooltip>
        </Tag>
      </div>
    );
  };

  return (
    <div className="flex gap-2 flex-col">
      <p className="text-sm text-start">Теги:</p>
      <Select<string[]>
        mode="tags"
        tagRender={TagContent as any}
        value={constructor.tags.map((tag) => tag.id)}
        options={constructor.tags.map((tag) => ({
          value: tag.id,
          label: tag.label,
          color: tag.color,
        }))}
        onSelect={handleSelect}
        onChange={handleChange}
        placeholder="Введите тег"
        showSearch={false}
        open={false}
        suffixIcon={null}
        className="w-full"
      />
    </div>
  );
};
