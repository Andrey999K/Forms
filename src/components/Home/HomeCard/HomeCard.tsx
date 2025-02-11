import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { CardWithCount } from '@/types/card';
import { Badge, Button } from 'antd';
import { MdOutlineEdit, MdOutlineQuestionAnswer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteForm } from '@/hooks/useDeleteForm.ts';

type Props = {
  item: CardWithCount;
};

export const HomeCard = (props: Props) => {
  const { item } = props;
  const { handleSetFormDeleted } = useDeleteForm(item.id);

  return (
    <GlassWrapper className="h-full flex flex-col !shadow-none">
      <div className="py-3 px-1 flex items-center justify-center ">
        <Link
          to={`/forms/${item.id}`}
          className="text-textPrimary hover:text-primary line-clamp-1 text-base font-semibold"
        >
          {item.title}
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-center py-3 px-1 border-t border-b dark:border-border-dark">
        <div className="line-clamp-3 text-textPrimary text-sm">{item.description}</div>
      </div>
      <div className="flex justify-around items-center p-2">
        <Link key="response" to={`/forms/${item.id}/responses`} className="block w-full">
          <Button
            block
            type="text"
            icon={
              <Badge
                count={item.responseCount ?? 0}
                showZero
                size="small"
                styles={{ indicator: { fontSize: 10 }, root: { color: 'inherit' } }}
              >
                <MdOutlineQuestionAnswer size={18} />
              </Badge>
            }
          ></Button>
        </Link>
        <div className="border-l w-1 h-full ml-2 pl-2 dark:border-border-dark"></div>
        <Link key="edit" to={`/forms/${item.id}/edit`} className="block w-full">
          <Button block type="text" icon={<MdOutlineEdit size={18} />}></Button>
        </Link>
        <div className="border-l w-1 h-full ml-2 pl-2 dark:border-border-dark"></div>
        <Button
          block
          color="danger"
          type="text"
          key="delete"
          data-testid="delete-button"
          danger
          className="w-full flex items-center"
          icon={<DeleteOutlined size={18} />}
          onClick={handleSetFormDeleted}
        ></Button>
      </div>
    </GlassWrapper>
  );
};
