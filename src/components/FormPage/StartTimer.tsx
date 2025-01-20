import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { Button } from 'antd';

export const StartTimer = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <GlassWrapper className="pt-8 pb-12 px-8 w-full max-w-screen-lg flex flex-col justify-center items-center gap-5">
        <p className="font-semibold text-3xl">Внимание!</p>
        <p>На заполнение этой формы даётся 15 минут!</p>
        <div className="mt-2 w-full max-w-[16ch]">
          <Button type="primary" className="w-full">
            Начать
          </Button>
        </div>
      </GlassWrapper>
    </div>
  );
};
