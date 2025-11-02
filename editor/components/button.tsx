import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../item-type";
import {Button as AntdButton} from "antd";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: React.ReactNode;
  /** 当前组件的文本内容 */
  text?: string;
  /** 当前组件的按钮类型 */
  type?: "primary" | "default";
  /** 当前组件的点击事件 */
  onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  const {id, children, text, type = "primary", onClick} = props;

  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      // 这里把组件的id返回，在拖拽结束时间里可以拿到这个id
      return {id};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <AntdButton
      type={type}
      data-component-id={id}
      onClick={onClick}
      ref={dropRef as unknown as React.Ref<HTMLButtonElement>}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid blue" : "1px solid #ccc",
      }}
    >
      {text || children}
    </AntdButton>
  );
};

export default Button;
