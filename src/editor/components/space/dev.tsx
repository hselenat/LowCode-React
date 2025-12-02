import {Space as AntdSpace} from "antd";
import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any;
  /** 间距方向 */
  direction?: "vertical" | "horizontal";
  /** 间距大小 */
  size?: "small" | "middle" | "large";
}

const Space: React.FC<Props> = (props) => {
  const {id, children, direction = "horizontal", size = "middle"} = props;
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

  if (!children.length)
    return (
      <AntdSpace
        data-component-id={id}
        ref={dropRef as unknown as React.Ref<HTMLDivElement>}
        direction={direction}
        size={size}
        className="p-[16px]"
        style={{
          border: canDrop ? "1px solid #ccc" : "none",
          width: direction === "vertical" ? "100%" : "",
        }}
      >
        暂无内容
      </AntdSpace>
    );
  return (
    <AntdSpace
      data-component-id={id}
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      direction={direction}
      size={size}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid #ccc" : "none",
        width: direction === "vertical" ? "100%" : "",
      }}
    >
      {children}
    </AntdSpace>
  );
};

export default Space;
