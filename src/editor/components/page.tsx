import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../item-type";

interface Props {
  /** 当前组件的子节点 */
  children: React.ReactNode;
  /** 当前组件的id */
  id: number;
}

const Page: React.FC<Props> = ({children, id}) => {
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
  return (
    <div
      data-component-id={id}
      className="p-[24px] h-[100%] box-border"
      style={{
        border: canDrop ? "1px solid blue" : "none",
      }}
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

export default Page;
