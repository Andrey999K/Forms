import { Form } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  text?: string;
  linkText: string;
  linkTo: string;
};

export const AuthTextLink = ({ text, linkText, linkTo }: Props) => {
  return (
    <Form.Item className="text-center  text-gray-500 text-xs md:text-sm flex justify-end mr-1 mb-0">
      <span className="text-xs md:text-sm"> {text}&nbsp;</span>
      <Link
        to={linkTo}
        className="underline text-xs md:text-sm hover:text-gray-700 hover:underline font-medium"
      >
        {linkText}
      </Link>
    </Form.Item>
  );
};
