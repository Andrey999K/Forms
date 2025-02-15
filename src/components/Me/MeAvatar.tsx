import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { notification, Upload, UploadProps, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { UseFormSetValue } from 'react-hook-form';
import { MeChangeFields } from '@/types/me';
import { DEFAULT_AVATAR_URL } from '@/utils/constants/defaultAvatar';

type Props = {
  currentAvatarUrl?: string;
  avatar: File | null;
  isEdit: boolean;
  setAvatar: Dispatch<SetStateAction<File | null>>;
  setValue: UseFormSetValue<MeChangeFields>;
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
};

export const MeAvatar = ({
  currentAvatarUrl,
  isEdit,
  setAvatar,
  avatar,
  setValue,
  setPreviewUrl,
  previewUrl,
}: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (!file.type.startsWith('image/')) {
      notification.error({
        message: 'Ошибка',
        description: 'Можно загружать только изображения (JPG, PNG, WEBP, GIF и др.)!',
      });
      return false;
    }

    if (file.size / 1024 / 1024 >= 8) {
      notification.error({ message: 'Ошибка', description: 'Файл должен быть меньше 8MB!' });
      return false;
    }

    setIsAdding(true);
    setAvatar(file);
    return false;
  };

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setIsAdding(false);
      };
      reader.readAsDataURL(avatar);
    } else {
      setPreviewUrl(null);
      setIsAdding(false);
    }
  }, [avatar]);

  const onDeleteAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAvatar(null);
    setPreviewUrl(DEFAULT_AVATAR_URL);
    setValue('avatarUrl', DEFAULT_AVATAR_URL, { shouldDirty: true });
  };

  const onPreviewAvatar = () => {
    const previewSrc = previewUrl || currentAvatarUrl || null;
    setPreviewImage(previewSrc);
    setPreviewOpen(true);
  };

  const image = previewUrl || currentAvatarUrl || DEFAULT_AVATAR_URL;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center w-full mb-6">
        <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl">
          <img src={image} className="w-full h-full object-cover rounded-full" alt="avatar" />
          {isEdit &&
            currentAvatarUrl !== DEFAULT_AVATAR_URL &&
            previewUrl !== DEFAULT_AVATAR_URL && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={onPreviewAvatar}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-gray-300 transition-all mx-2"
                  title="Просмотр"
                >
                  <AiOutlineEye size={24} />
                </button>
                <button
                  type="button"
                  onClick={onDeleteAvatar}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-red-500 hover:text-red-700 transition-all mx-2"
                  title="Удалить"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            )}

          {isEdit && !avatar && currentAvatarUrl === DEFAULT_AVATAR_URL && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Upload
                name="avatar"
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={beforeUpload}
                className="flex items-center justify-center"
              >
                <button
                  type="button"
                  style={{
                    border: 0,
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isAdding ? <LoadingOutlined /> : <PlusOutlined />}
                </button>
              </Upload>
            </div>
          )}
        </div>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(null),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};
