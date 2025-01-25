import { BASE_AVATAR_URL } from '@/types/form';

export const MeAvatar = ({ avatarHash }: { avatarHash?: string }) => {
  const image = avatarHash
    ? `${BASE_AVATAR_URL}?seed=${avatarHash}`
    : `${BASE_AVATAR_URL}?seed=default`;

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="w-36 h-36 rounded-full overflow-hidden shadow-xl">
        <img src={image} className="w-full h-full object-cover" alt="avatar" />
      </div>
    </div>
  );
};
