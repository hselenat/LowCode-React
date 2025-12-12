import React from "react";

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

  return (
    <div
      data-component-id={id}
      className={`p-[16px] ${fontSize} ${fontWeight} ${textColor}`}
    >
      {text || "请输入文本内容"}
    </div>
  );
};

export default Text;
