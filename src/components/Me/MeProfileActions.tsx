import { MeData } from '@/types/me';
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
  const btnPositionStyles = 'absolute top-4 right-5 p-0 m-0 bg-transparent border-none';
  const submitBtnStyles = `${btnPositionStyles} ${
    !isValid || JSON.stringify(dirtyFields) === '{}'
      ? 'opacity-30 cursor-not-allowed'
      : 'opacity-100 cursor-pointer'
  }`;
  const isSubmitDisabled = !isValid || (JSON.stringify(dirtyFields) === '{}' && !avatar);

  return isEdit ? (
    <button type="submit" className={submitBtnStyles} disabled={isSubmitDisabled || isUpdating}>
      <FaRegCheckCircle size={35} />
    </button>
  ) : (
    <button className={btnPositionStyles} onClick={() => setEdit(true)}>
      <MdEdit size={35} className="cursor-pointer" />
    </button>
  );
};
