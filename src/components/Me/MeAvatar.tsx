import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../ui/Loader';

type Props = {
  currentAvatarUrl?: string;
  isLoading: boolean;
  avatar: File | null;
  setAvatar: Dispatch<SetStateAction<File | null>>;
};

export const MeAvatar = ({ currentAvatarUrl, isLoading, avatar }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(avatar);
    } else {
      setPreviewUrl(null);
    }
  }, [avatar]);

  const image = previewUrl
    ? previewUrl
    : currentAvatarUrl
      ? currentAvatarUrl
      : 'https://ui-avatars.com/api/?name=User&background=random';

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="flex flex-col gap-4">
        <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl">
          <img src={image} className="w-full h-full object-cover" alt="avatar" />
        </div>
      </div>
    </div>
  );
};
