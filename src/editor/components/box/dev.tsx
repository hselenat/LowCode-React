import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children: any;
}

const Box: React.FC<Props> = (props: Props) => {
  const {id, children} = props;
  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [
      ItemType.Box,
      ItemType.Space,
      ItemType.Text,
      ItemType.Button,
      ItemType.Modal,
      ItemType.Table,
      ItemType.Form,
      ItemType.SearchForm,
    ],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return {id};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  if (!children.length)
    return (
      <div
        data-component-id={id}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
        className="p-[16px]"
        style={{
          border: canDrop ? "1px solid #ccc" : "none",
        }}
      >
        空盒子
      </div>
    );
  return (
    <div
      data-component-id={id}
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid #ccc" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default Box;
