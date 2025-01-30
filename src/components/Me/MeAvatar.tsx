import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../ui/Loader';

type Props = {
  avatarHash?: string;
  currentAvatarUrl?: string;
  isLoading: boolean;
  isEdit: boolean;
  avatar: File | null;
  setAvatar: Dispatch<SetStateAction<File | null>>;
};

export const MeAvatar = ({
  avatarHash,
  currentAvatarUrl,
  isLoading,
  isEdit,
  setAvatar,
  avatar,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      toast.error('Можно загружать только JPG/PNG/WEBP!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      toast.error('Файл должен быть меньше 8MB!');
      return false;
    }

    setLoading(true);
    setAvatar(file);
    return false;
  };

  const image = previewUrl
    ? previewUrl
    : currentAvatarUrl
      ? currentAvatarUrl
      : `https://api.dicebear.com/7.x/initials/svg?seed=${avatarHash}`;

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center w-full mb-4">
      <div className="flex flex-col gap-4">
        <div
          className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={image} className="w-full h-full object-cover" alt="avatar" />
          {isHovered && isEdit && (
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
  );
};
