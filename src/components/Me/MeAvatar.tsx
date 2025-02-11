import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, notification, Upload, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

type Props = {
  currentAvatarUrl?: string;
  avatar: File | null;
  isEdit: boolean;
  setAvatar: Dispatch<SetStateAction<File | null>>;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  isAlertVisible: boolean;
};

export const MeAvatar = ({
  currentAvatarUrl,
  isEdit,
  setAvatar,
  avatar,
  setAlertVisible,
  isAlertVisible,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isHover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(avatar);
    } else {
      setPreviewUrl(null);
    }
  }, [avatar]);

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      notification.error({
        message: 'Ошибка',
        description: 'Для аватара можно загружать только форматы JPG/PNG/WEBP!',
      });
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      notification.error({ message: 'Ошибка', description: 'Файл должен быть меньше 8MB!' });
      return false;
    }

    setIsAdding(true);
    setAvatar(file);
    return false;
  };

  const image = previewUrl
    ? previewUrl
    : currentAvatarUrl
      ? currentAvatarUrl
      : 'https://ui-avatars.com/api/?name=User&background=random';

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }}>
      {isAdding ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      {isEdit && isAlertVisible && (
        <div className="absolute top-[-20px] z-50">
          <Alert
            message="Для изменения аватара наведите на него и нажмите"
            type="info"
            showIcon
            closable
            onClose={() => setAlertVisible(false)}
          />
        </div>
      )}
      <div className="flex justify-center w-full mb-6">
        <div className="flex flex-col gap-4">
          <div
            className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img src={image} className="w-full h-full object-cover" alt="avatar" />
            {isHover && isEdit && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                >
                  {uploadButton}
                </Upload>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
