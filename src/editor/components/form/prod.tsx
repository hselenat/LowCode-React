import {Form as AntdForm, Input} from "antd";
import React, {forwardRef, useImperativeHandle, useMemo} from "react";
import axios from "axios";

interface Props {
  /** 组件的id */
  id: number;
  /** 提交表单的url接口地址 */
  url?: string;
  /** 子组件，表单项 */
  children: any;
  /** 搜索事件 */
  onSearch?: (values: any) => void;
  /** 保存成功事件 */
  onSaveSuccess?: (values: any) => void;
  /** 保存失败事件 */
  onSaveFail?: (error: any) => void;
}

const Form = (Props: Props, ref: any) => {
  const {children, onSaveSuccess, onSaveFail, url} = Props;
  const [form] = AntdForm.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
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
        if (onSaveSuccess) {
          onSaveSuccess?.(values);
        }
      }
    } catch (error) {
      console.error("保存失败:", error);
      if (onSaveFail) {
        onSaveFail?.(error);
      }
    }
  }

  return (
    <AntdForm
      name="form"
      labelCol={{span: 5}}
      wrapperCol={{span: 18}}
      form={form}
      onFinish={save}
    >
      {searchItems.map((item: any) => (
        <AntdForm.Item key={item.id} label={item.label} name={item.name}>
          <Input placeholder="请输入" />
        </AntdForm.Item>
      ))}
    </AntdForm>
  );
};

export default forwardRef(Form);
