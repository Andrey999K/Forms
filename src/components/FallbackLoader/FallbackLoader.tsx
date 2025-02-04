import { Loader } from '@/components/ui/Loader';

export const FallbackLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  );
};
