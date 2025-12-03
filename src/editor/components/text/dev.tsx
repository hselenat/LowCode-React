import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 字体大小 */
  fontSize?: string;
  /** 当前组件的文本内容 */
  text?: string;
  /** 字体加粗 */
  fontWeight?: string;
  /** 字体颜色 */
  textColor?: string;
}

const Text: React.FC<Props> = (props) => {
  const {
    id,
    fontSize = "text-base",
    text,
    fontWeight = "font-normal",
    textColor = "text-current",
  } = props;
  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.Text],
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
      className={`p-[16px] ${fontSize} ${fontWeight} ${textColor}`}
      style={{
        border: canDrop ? "1px solid blue" : "none",
      }}
    >
      {text || "请输入文本内容"}
    </div>
  );
};

export default Text;
