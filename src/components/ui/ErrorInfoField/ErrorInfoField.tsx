import { Typography } from 'antd';

type Props = {
  message: string;
};
export const ErrorInfoField = ({ message }: Props) => {
  return (
    <Typography.Text
      type="danger"
      className="text-red-500 text-sm flex justify-start ml-2 min-h-[20px]"
    >
      {message}
    </Typography.Text>
  );
};
