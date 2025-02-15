import { MeData } from '@/types/me';
import { Spin } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type Props = {
  isEdit: boolean;
  dirtyFields: Partial<Record<keyof MeData, boolean>>;
  isValid: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isUpdating: boolean;
  avatar: File | null;
};

export const MeProfileActions = ({
  isEdit,
  dirtyFields,
  isValid,
  setEdit,
  isUpdating,
  avatar,
}: Props) => {
  const btnPositionStyles =
    'absolute top-4 right-5 p-0 m-0 bg-transparent border-none transition-all duration-300 ease-in-out';
  const submitBtnStyles = `${btnPositionStyles} ${
    !isValid || JSON.stringify(dirtyFields) === '{}'
      ? 'opacity-30 cursor-not-allowed'
      : 'opacity-100 cursor-pointer hover:text-primary'
  }`;
  const isSubmitDisabled = !isValid || (JSON.stringify(dirtyFields) === '{}' && avatar === null);

  return isUpdating ? (
    <Spin size="large" className={btnPositionStyles} />
  ) : isEdit ? (
    <button type="submit" className={submitBtnStyles} disabled={isSubmitDisabled}>
      <FaRegCheckCircle size={30} />
    </button>
  ) : (
    <button className={btnPositionStyles} onClick={() => setEdit(true)}>
      <MdEdit size={30} className="cursor-pointer hover:text-primary" />
    </button>
  );
};
