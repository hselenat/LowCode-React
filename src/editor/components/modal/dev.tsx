import React from "react";
import type {CommonComponentProps} from "../../interface";
import {useDrop} from "../../hooks/use-drop";

const Modal: React.FC<CommonComponentProps> = (props: CommonComponentProps) => {
  const {_id, _name, title, children} = props;
  const {canDrop, dropRef} = useDrop(_id, _name);

  if (!children?.length) {
    return (
      <div data-component-id={_id} className="p-[10px]">
        <h4>{title}</h4>
        <div
          ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
          className="p-[16px] flex justify-center"
          style={{border: canDrop ? "1px solid #ccc" : "none"}}
        >
          暂无内容
        </div>
      </div>
    );
  }

  return (
    <div data-component-id={_id} className="p-[10px]">
      <h4>{title}</h4>
      <div
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
        className="p-[16px]"
        style={{border: canDrop ? "1px solid #ccc" : "none"}}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
