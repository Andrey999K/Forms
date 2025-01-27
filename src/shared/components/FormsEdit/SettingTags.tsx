import { ConstructorForm, HandleChangeForm } from '@/shared/types';
import { Tag as TagForm } from '@/shared/types/form';
import { getUUID } from '@/shared/utils/getUUID';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { theme, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Tag } from '../ui/Tag/Tag';
import { AutoWidthInput } from './AutoWidthInput';

interface Props {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
}

export const SettingTags: React.FC<Props> = (props) => {
  const { constructor, onChangeForm } = props;
  const { token } = theme.useToken();
  const [tags, setTags] = useState<TagForm[]>(constructor.settings.tags);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState<string>('');
  const [editInputValue, setEditInputValue] = useState<string>('');
  const [editTagColor, setEditTagColor] = useState<string>(token.colorPrimary);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  useEffect(() => {
    onChangeForm?.({ name: 'settings', value: { ...constructor.settings, tags } });
  }, [tags]);

  const handleClose = (tagId: string) => {
    const newTags = tags.filter((tag) => tag.id !== tagId);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.some((tag) => tag.label === inputValue)) {
      const newTag: TagForm = {
        id: getUUID(),
        label: inputValue,
        color: editTagColor,
      };
      setTags([...tags, newTag]);
    }
    setInputVisible(false);
    setInputValue('');
    setEditTagColor(token.colorPrimary);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    const index = newTags.findIndex((tag) => tag.id === editInputIndex);
    newTags[index] = { ...newTags[index], label: editInputValue, color: editTagColor };

    setTags(newTags);
    setEditInputIndex('');
    setEditInputValue('');
    setEditTagColor(token.colorPrimary);
  };

  const handleColorChange = (color: string) => {
    setEditTagColor(color);
  };

  useEffect(() => {
    setTags(constructor.settings.tags);
  }, []);

  return (
    <div className="flex justify-start flex-wrap gap-2 items-center">
      <span>Теги:</span>
      {tags.map((tag) => {
        if (editInputIndex === tag.id) {
          return (
            <AutoWidthInput
              key={tag.id}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
              onColorChange={handleColorChange}
              tagColor={editTagColor}
            />
          );
        }
        const isLongTag = tag.label.length > 20;
        const tagElem = (
          <Tag
            key={tag.id}
            closable={true}
            color={tag.color}
            style={{ userSelect: 'none', cursor: 'pointer' }}
            onClose={() => handleClose(tag.id)}
          >
            <span
              onClick={(e) => {
                setEditInputIndex(tag.id);
                setEditInputValue(tag.label);
                setEditTagColor(tag.color);
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.label} key={tag.id}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <AutoWidthInput
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          onColorChange={handleColorChange}
          tagColor={editTagColor}
        />
      ) : (
        <Tag
          style={{
            background: token.colorBgContainer,
            borderStyle: 'dashed',
          }}
          icon={<PlusOutlined />}
          onClick={showInput}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};
