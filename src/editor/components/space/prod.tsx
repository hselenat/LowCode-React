import {Space as AntdSpace} from "antd";
import type {SpaceSize} from "antd/es/space";
import React from "react";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children: any;
  /** 间距大小 */
  size: SpaceSize;
  /** 方向 */
  direction: "vertical" | "horizontal";
}

const Space: React.FC<Props> = (props: Props) => {
  const {children, size = "middle", direction = "horizontal"} = props;
  return (
    <AntdSpace
      size={size}
      direction={direction}
      className="p-[16px]"
      style={{
        width: direction === "vertical" ? "100%" : "",
      }}
    >
      {children}
    </AntdSpace>
  );
};
export default Space;
