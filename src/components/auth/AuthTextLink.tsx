import { Form } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  text: string;
  linkText: string;
  linkTo: string;
};

export const AuthTextLink = ({ text, linkText, linkTo }: Props) => {
  return (
    <Form.Item className="text-center text-gray-500 text-sm flex justify-end mr-1">
      {text}&nbsp;
      <Link to={linkTo} className="underline hover:text-gray-700 hover:underline font-medium">
        {linkText}
      </Link>
    </Form.Item>
  );
};
