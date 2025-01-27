import { MeData } from '@/shared/types/me';
import { Dispatch, SetStateAction } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type Props = {
  isEdit: boolean;
  dirtyFields: Partial<Record<keyof MeData, boolean>>;
  isValid: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isUpdating: boolean;
};

export const MeProfileActions = ({
  isEdit,
  dirtyFields,
  isValid,
  setIsEdit,
  isUpdating,
}: Props) => {
  const btnPositionStyles = 'absolute top-4 right-5 p-0 m-0 bg-transparent border-none';
  const submitBtnStyles = `${btnPositionStyles} ${
    !isValid || JSON.stringify(dirtyFields) === '{}'
      ? 'opacity-30 cursor-not-allowed'
      : 'opacity-100 cursor-pointer'
  }`;
  const isSubmitDisabled = !isValid || JSON.stringify(dirtyFields) === '{}';

  return isEdit ? (
    <button type="submit" className={submitBtnStyles} disabled={isSubmitDisabled || isUpdating}>
      <FaRegCheckCircle size={35} color={isSubmitDisabled ? '#808080' : '#0E8B57'} />
    </button>
  ) : (
    <button className={btnPositionStyles} onClick={() => setIsEdit(true)}>
      <MdEdit size={35} className="cursor-pointer" />
    </button>
  );
};
