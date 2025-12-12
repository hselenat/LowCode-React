import React, {useMemo} from "react";
import {Table as AntdTable} from "antd";
import {useDrop} from "../../hooks/use-drop";
import type {CommonComponentProps} from "../../interface";

const Table: React.FC<CommonComponentProps> = (props: CommonComponentProps) => {
  const {_id, _name, children} = props;
  const {canDrop, dropRef} = useDrop(_id, _name);

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div
            className="m-[16px] p-[16px]"
            data-component-id={item.props?._id}
          >
            {item.props?.title}
          </div>
        ),
        dataIndex: item.props?.dataIndex,
        key: item.props?.dataIndex,
      };
    });
  }, [children]);

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      data-component-id={_id}
      className="w-[100%]"
      style={{
        border: canDrop ? "1px solid #ccc" : "none",
      }}
    >
      <AntdTable dataSource={[]} columns={columns} pagination={false} />
    </div>
  );
};

export default Table;
