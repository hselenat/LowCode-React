import {Space as AntdSpace} from "antd";
import React from "react";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any;
  /** 间距大小 */
  size?: "small" | "middle" | "large";
  /** 方向 */
  direction?: "vertical" | "horizontal";
}

const Space: React.FC<Props> = (props) => {
  const {children, size = "middle", direction = "horizontal"} = props;
  return (
    <AntdSpace
      size={size}
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
