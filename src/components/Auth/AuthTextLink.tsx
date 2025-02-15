import { Form } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  text?: string;
  linkText: string;
  linkTo: string;
};

export const AuthTextLink = ({ text, linkText, linkTo }: Props) => {
  return (
    <Form.Item className="text-center text-xs md:text-sm flex justify-end mb-0 input-item-text-link">
      <span className="text-xs md:text-sm"> {text}&nbsp;</span>
      <Link to={linkTo} className="underline text-xs md:text-sm hover:underline font-medium">
        {linkText}
      </Link>
    </Form.Item>
  );
};
