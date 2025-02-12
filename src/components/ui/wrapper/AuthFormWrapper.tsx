import { Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import ShapeWrapper from '@/layouts/GlassLayout';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
};

export const AuthFormWrapper = ({ title, subtitle, icon, children }: Props) => {
  return (
    <ShapeWrapper>
      <Content className="flex px-8 md:p-0 justify-center items-center min-h-screen overflow-y-auto">
        <GlassWrapper className="px-8 py-8 rounded-2xl max-w-sm w-full" style={{ zIndex: 10 }}>
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg">
                {icon}
              </div>
            </div>
            <Typography.Title level={2} style={{ marginBottom: '0.5rem' }}>
              {title}
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {subtitle}
            </Typography.Title>
          </div>
          {children}
        </GlassWrapper>
      </Content>
    </ShapeWrapper>
  );
};
