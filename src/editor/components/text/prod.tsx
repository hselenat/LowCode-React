import React from "react";

interface Props {
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
    fontSize = "text-base",
    text,
    fontWeight = "font-normal",
    textColor = "text-current",
  } = props;

  return (
    <div
      className={`p-[16px] ${fontSize} ${fontWeight} ${textColor}`}
      style={{
        fontSize,
      }}
    >
      {text || "请输入文本内容"}
    </div>
  );
};

export default Text;
