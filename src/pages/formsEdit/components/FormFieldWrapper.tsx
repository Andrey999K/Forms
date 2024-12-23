import { CloseOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Tooltip } from "antd";
import { FC, ReactNode } from "react";
import { ConstructorField } from "../types/form";

interface Props {
  children: ReactNode;
  dragRef: React.RefObject<HTMLButtonElement>;
  field: ConstructorField;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  className?: string;
}

export const ConstructorFieldWrapper: FC<Props> = (props) => {
  const {
    field,
    children,
    dragRef,
    onRemoveField,
    onUpdateField,
    className = "",
  } = props;
  return (
    <div className={`relative flex ${className}`}>
      <div className="w-full flex flex-col">
        <button
          ref={dragRef}
          className={`w-full cursor-move hover:text-blue-500`}
        >
          <HolderOutlined className="rotate-90" />
        </button>
        <div className="w-full px-4 pb-4 flex flex-col gap-2 items-start">
          <div className="w-full flex gap-2 items-center">
            <Input
              placeholder="Вопрос"
              value={field.question}
              onChange={(e) =>
                onUpdateField(field.id, { question: e.target.value })
              }
            />
          </div>
          {children}
        </div>
      </div>

      <div className="border-l my-2 px-2 flex flex-col gap-2 justify-between items-center">
        <Tooltip title="Обязательное поле">
          <Switch
            size="small"
            value={field.require}
            onChange={(require) => onUpdateField(field.id, { require })}
          />
        </Tooltip>
        <Tooltip title="Удалить">
          <Button
            type="text"
            danger
            icon={<CloseOutlined />}
            onClick={() => onRemoveField(field.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
