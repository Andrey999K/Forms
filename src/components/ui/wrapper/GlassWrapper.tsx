import { HTMLAttributes, ReactNode, forwardRef } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const GlassWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`shadow-custom 
          border border-border dark:border-border-dark
          backdrop-blur-[4px] 
          bg-[rgba(255, 255, 255, 0.2)] dark:bg-[rgba(0, 0, 0, 0.2)] 
          rounded-2xl 
          transition-shadow 
          ${className || ''}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

GlassWrapper.displayName = 'GlassWrapper';
