import {Form as AntdForm, Input} from "antd";
import React, {useMemo} from "react";
import {useDrop} from "../../hooks/use-drop";
import type {CommonComponentProps} from "../../interface";

const Form: React.FC<CommonComponentProps> = (props: CommonComponentProps) => {
  const {_id, _name, children, onSearch} = props;
  const [form] = AntdForm.useForm();

  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        id: item.props._id,
        label: item.props.label,
        name: item.props.name,
        type: item.props.type,
      };
    });
  }, [children]);

  const search = (values: any) => {
    if (onSearch) {
      onSearch?.(values);
    }
  };

  const {canDrop, dropRef} = useDrop(_id, _name);

  if (!children?.length) {
    return (
      <div
        data-component-id={_id}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
        className="p-[16px] flex justify-center"
        style={{border: canDrop ? "1px solid #ccc" : "none"}}
      >
        暂无内容
      </div>
    );
  }

  return (
    <div
      className="w-[100%] py-[20px]"
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      data-component-id={_id}
      style={{border: canDrop ? "1px solid #ccc" : "none"}}
    >
      <AntdForm
        labelCol={{span: 5}}
        wrapperCol={{span: 18}}
        form={form}
        onFinish={search}
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
    </div>
  );
};

export default Form;
