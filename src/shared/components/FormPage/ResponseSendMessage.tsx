import { Result } from 'antd';
import { GlassWrapper } from '@/shared/components/ui/wrapper/GlassWrapper.tsx';

export const ResponseSendMessage = () => {
  return (
    <GlassWrapper>
      <Result status="success" title="Отклик успешно отправлен!" />
    </GlassWrapper>
  );
};
