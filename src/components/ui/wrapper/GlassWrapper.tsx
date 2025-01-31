import { ReactNode, forwardRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const GlassWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={
          'shadow-xl backdrop-blur-[3px] bg-[rgba(255, 255, 255, 0.2)] rounded-2xl' +
          (className ? ' ' + className : '')
        }
        {...rest}
      >
        {children}
      </div>
    );
  }
);

GlassWrapper.displayName = 'GlassWrapper';
