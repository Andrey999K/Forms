import { Button, Form } from 'antd';
import { UseFormReset } from 'react-hook-form';

export const AuthClearFormButton = ({ reset }: { reset: UseFormReset<any> }) => {
  return (
    <Form.Item className="flex justify-end ml-1">
      <Button
        onClick={() => reset()}
        className="rounded-lg text-[#4a4b4d] bg-[#EFF2F6] hover:!bg-[#E8ECF2] hover:!text-[#444547] text-xs h-[39.82px] !border-none focus:!outline-none active:!outline-none active:!shadow-none active:!ring-0"
      >
        Очистить форму
      </Button>
    </Form.Item>
  );
};
