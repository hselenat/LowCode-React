import {Dropdown} from "antd";
import React from "react";

interface Props {
  position: {
    top: number;
    left: number;
  };
  onSelect: (item: string) => void;
  items: {
    label: string;
    key: string;
  }[];
  open: boolean;
}

const ContextMenu: React.FC<Props> = (props: Props) => {
  const {position, onSelect, items, open} = props;
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <Dropdown
        menu={{
          items,
          onClick: onSelect,
        }}
        trigger={["click"]}
        // visible={open}
        open={open}
      />
    </div>
  );
};

export default ContextMenu;
