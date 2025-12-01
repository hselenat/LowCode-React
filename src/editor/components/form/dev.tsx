import {Form as AntdForm, Input} from "antd";
import React, {useMemo} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  id: number;
  children: any;
  onSearch?: (values: any) => void;
}

const Form: React.FC<Props> = (Props) => {
  const {id, children, onSearch} = Props;
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

  const search = (values: any) => {
    if (onSearch) {
      onSearch(values);
    }
  };

  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      // 这里把当前组件的id返回出去，在拖拽结束事件里可以拿到这个id。
      return {id};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  if (!children.length) {
    return (
      <div
        data-component-id={id}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
        className="flex justify-center"
      >
        暂无内容
      </div>
    );
  }

  return (
    <div
      className="w-[100%] py-[20px]"
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      data-component-id={id}
      style={{border: canDrop ? "1px solid #ccc" : "none"}}
    >
      <AntdForm
        labelCol={{span: 6}}
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
