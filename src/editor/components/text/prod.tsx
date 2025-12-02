import React from "react";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any;
  /** 字体大小 */
  fontSize?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Text: React.FC<Props> = (props) => {
  const {children, fontSize = "normal"} = props;

  return (
    <div
      className="p-[16px]"
      style={{
        fontSize,
      }}
    >
      {children || "暂无内容"}
    </div>
  );
};

export default Text;
