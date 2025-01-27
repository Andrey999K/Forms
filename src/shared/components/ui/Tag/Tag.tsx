import React from 'react';

interface Props {
  children?: React.ReactNode | string;
  color?: string;
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Tag: React.FC<Props> = (props) => {
  const { color = 'gray', closable = false, icon } = props;
  const { children, onClick, onClose, className, style } = props;

  return (
    <div
      onClick={onClick}
      className={
        'inline-flex gap-1 items-center px-2 py-[0.20rem] rounded text-sm border' +
        (className ? ' ' + className : '')
      }
      style={{
        ...style,
        color,
        borderColor: `${color}75`,
        backgroundColor: `${color}25`,
      }}
    >
      {icon && <span>{icon}</span>}
      {children && <span>{children}</span>}
      {closable && (
        <button
          className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
