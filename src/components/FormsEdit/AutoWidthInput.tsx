import type { InputRef } from 'antd';
import { ColorPicker, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface AutoWidthInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onPressEnter: () => void;
  onColorChange: (color: string) => void;
  tagColor: string;
  minWidth?: number;
  className?: string;
  prefix?: React.ReactNode;
}

export const AutoWidthInput: React.FC<AutoWidthInputProps> = (props) => {
  const {
    value,
    onChange,
    onBlur,
    onPressEnter,
    onColorChange,
    tagColor,
    minWidth = 90,
    className = '',
  } = props;

  const inputRef = useRef<InputRef>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(minWidth);
  const [containerWidth, setContainerWidth] = useState<number>(minWidth);
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

  const handleInputBlur = () => {
    if (!isOpenColorPicker) onBlur();
  };

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const parentContainerWidth = containerRef.current.parentElement?.offsetWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const newWidth = parentContainerWidth ? parentContainerWidth : containerWidth;

        setContainerWidth(Math.max(newWidth, minWidth));
      }
    };

    updateContainerWidth();

    window.addEventListener('resize', updateContainerWidth);
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [minWidth]);

  useEffect(() => {
    if (!textRef.current) return;
    const textWidth = textRef.current.offsetWidth;
    const suffixWidth = 22;
    const totalWidth = textWidth + suffixWidth;
    const inputWidth = Math.max(minWidth, totalWidth);
    setWidth(inputWidth);
  }, [value, minWidth, inputRef.current]);

  return (
    <div ref={containerRef} className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onBlur={handleInputBlur}
        onPressEnter={onPressEnter}
        size="small"
        className={className}
        suffix={
          <div>
            <ColorPicker
              value={tagColor}
              onChange={(color) => onColorChange(color.toHexString())}
              open={isOpenColorPicker}
              onOpenChange={(open) => setIsOpenColorPicker(open)}
              onChangeComplete={(color) => console.log(color)}
              size="small"
              style={{
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                transform: 'translate(0px, 1px)',
              }}
            />
          </div>
        }
        style={{
          borderColor: `${tagColor}75`,
          backgroundColor: `${tagColor}25`,
          width: width,
          maxWidth: containerWidth,
          transition: 'width 0.2s ease-in-out',
          verticalAlign: 'top',
          paddingRight: 0,
        }}
      />
      <div
        ref={textRef}
        className="absolute top-0 left-0 invisible px-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ maxWidth: containerWidth }}
      >
        {value || ''}
      </div>
    </div>
  );
};
