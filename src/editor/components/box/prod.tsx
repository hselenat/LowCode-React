import React from "react";

interface Props {
  /** 当前组件的子节点 */
  children: any;
}

const Box: React.FC<Props> = (props: Props) => {
  const {children} = props;

  return (
    <div className="p-[16px]">{!children.length ? "空盒子" : children}</div>
  );
};

export default Box;
