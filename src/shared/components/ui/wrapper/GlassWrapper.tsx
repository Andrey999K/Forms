import { ReactNode, forwardRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  settings?: Partial<Settings>;
};

type Settings = {
  shadow: string;
  backdropBlur: number;
  bgColor: string;
  rounded: number;
};

const defaultSettings: Settings = {
  shadow: '0rem 0.1rem 1rem 0.1rem rgba(0, 0, 0, 0.1)',
  backdropBlur: 3,
  bgColor: 'rgba(255, 255, 255, 0.2)',
  rounded: 1,
};

export const GlassWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, style, settings }, ref) => {
    const CONFIG: Settings = { ...defaultSettings, ...settings };

    const wrapperStyle = {
      borderRadius: `${CONFIG.rounded}rem`,
      boxShadow: CONFIG.shadow,
      backdropFilter: `blur(${CONFIG.backdropBlur}px)`,
      backgroundColor: CONFIG.bgColor,
      ...style,
    };

    return (
      <div ref={ref} className={`${className || ''}`} style={wrapperStyle}>
        {children}
      </div>
    );
  }
);

GlassWrapper.displayName = 'GlassWrapper';
