import {Space as AntdSpace} from "antd";
// import type {SpaceSize} from "antd/es/space";
import React from "react";
import {useDrop} from "../../hooks/use-drop";
import type {CommonComponentProps} from "../../interface";

// interface Props {
//   /** 当前组件的id */
//   id: number;
//   /** 当前组件的子节点 */
//   children: any;
//   /** 间距方向 */
//   direction: "vertical" | "horizontal";
//   /** 当前组件的尺寸 */
//   size: SpaceSize;
// }

const Space: React.FC<CommonComponentProps> = (props: CommonComponentProps) => {
  const {
    _id,
    _name,
    children,
    direction = "horizontal",
    size = "middle",
  } = props;
  const {canDrop, dropRef} = useDrop(_id, _name);

  if (!children.length)
    return (
      <AntdSpace
        data-component-id={_id}
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
      data-component-id={_id}
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
