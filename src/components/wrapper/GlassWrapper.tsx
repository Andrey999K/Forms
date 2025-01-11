import { FC } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  settings?: Partial<Settings>;
};

type Settings = {
  shadow: string;
  backdropBlur: number;
  bgColor: string;
  opacity: number;
  rounded: number;
  borderColor: string;
};

const defaultSettings: Settings = {
  shadow: '0 0.25rem 0.35rem -0.05rem rgba(0, 0, 0, 0.1)',
  backdropBlur: 15,
  bgColor: 'white',
  opacity: 0.25,
  rounded: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
};

export const GlassWrapper: FC<Props> = ({ children, className, settings }) => {
  const CONFIG: Settings = { ...defaultSettings, ...settings };

  const wrapperStyle = {
    borderRadius: `${CONFIG.rounded}rem`,
    boxShadow: CONFIG.shadow,
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const backgroundStyle = {
    content: '""',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: `blur(${CONFIG.backdropBlur}px)`,
    backgroundColor: CONFIG.bgColor,
    opacity: CONFIG.opacity,
    zIndex: -1,
  };

  const borderStyle = {
    content: '""',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    border: `1px solid ${CONFIG.borderColor}`,
    zIndex: -1,
  };

  return (
    <div className={`${className || ''}`} style={wrapperStyle}>
      <div style={borderStyle} />
      <div style={backgroundStyle} />
      {children}
    </div>
  );
};
