import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any;
  /** 字体大小 */
  fontSize?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Text: React.FC<Props> = (props) => {
  const {id, children, fontSize = "normal"} = props;
  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button, ItemType.Text],
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
    <div
      data-component-id={id}
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid blue" : "none",
        fontSize,
        color: "#232323",
      }}
    >
      {children || "暂无内容"}
    </div>
  );
};

export default Text;
