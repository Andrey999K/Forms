import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { ConstructorField } from '@/types';
import { useCreateResponseFormMutation } from '@/redux/response';

export const FormPage = () => {
  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');
  const [createFormResponse] = useCreateResponseFormMutation();
  const [form] = Form.useForm();

  const renderField = (field: ConstructorField) => {
    const { type } = field;
    switch (type) {
      case 'input':
        return <Input key={field.id} />;
      case 'textarea':
        return <Input.TextArea />;
      case 'radio':
        return (
          <Radio.Group className="flex justify-start">
            {field.options?.map((option) => (
              <Radio key={option.id} value={option.id}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group className="flex justify-start">
            {field.options?.map((option) => (
              <Checkbox key={option.id} value={option.id}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
    }
  };

  const onFinish = async (values: { [key: string]: string }) => {
    console.log('values', values);
    const answers = Object.keys(values)
      .map((field) => {
        const questionData = formData?.fields.find((currentField) => currentField.id === field);
        return questionData
          ? { id: questionData.id, question: questionData.question, answer: values[field] }
          : false;
      })
      .filter((item) => item !== false);
    if (formId) {
      const answersData = {
        fields: answers,
        formId,
      };
      console.log(answersData);
      const result = await createFormResponse(answersData).unwrap();
      console.log(result);
    }
  };

  if (!formId) {
    return <h2>Форма не найдена!</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!formData) {
    return <h2>Нет данных!</h2>;
  }

  return (
    <div className="pt-5">
      <h2 className="font-semibold text-lg">{formData.title}</h2>
      <p className="mt-3">{formData.description}</p>
      <Form form={form} onFinish={onFinish} className="mt-3 custom-form" layout="vertical">
        {formData.fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.question}
            name={field.id}
            rules={
              field.require ? [{ required: true, message: 'Поле обязательно к заполнению!' }] : []
            }
          >
            {renderField(field)}
          </Form.Item>
        ))}
        <Form.Item>
          <div className="flex justify-start">
            <Button type="primary" htmlType="submit" className="">
              Отправить форму
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
