import React from "react";

interface Props {
  /** 当前组件的子节点 */
  children: React.ReactNode;
  /** 当前组件的id */
  id: number;
}

const Page: React.FC<Props> = (props) => {
  const {children} = props;
  return <div className="p-[24px] h-[100%] box-border">{children}</div>;
};

export default Page;
