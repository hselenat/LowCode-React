import {Form as AntdForm, Input} from "antd";
import React, {useMemo} from "react";
import axios from "axios";

interface Props {
  id: number;
  url?: string;
  children: any;
  onSearch?: (values: any) => void;
  onSaveSuccess?: (values: any) => void;
  onSaveError?: (error: any) => void;
}

const Form: React.FC<Props> = (Props) => {
  const {children, onSaveSuccess, onSaveError, url} = Props;
  const [form] = AntdForm.useForm();
  const searchItems = useMemo(() => {
    return children.map(children, (item: any) => {
      return {
        id: item.props.id,
        label: item.props.label,
        name: item.props.name,
        type: item.props.type,
      };
    });
  }, [children]);

  async function save(values: any) {
    try {
      if (url) {
        await axios.post(url, values);
        onSaveSuccess?.(values);
      }
    } catch (error) {
      console.error("保存失败:", error);
      onSaveError?.(error);
    }
  }

  return (
    <AntdForm
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
      form={form}
      onFinish={save}
    >
      {searchItems.map((item: any) => (
        <AntdForm.Item
          data-component-id={item.id}
          key={item.id}
          label={item.label}
          name={item.name}
        >
          <Input placeholder="请输入" />
        </AntdForm.Item>
      ))}
    </AntdForm>
  );
};

export default Form;
