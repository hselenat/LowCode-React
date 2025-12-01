import React, {useMemo} from "react";
import {Table as AntdTable} from "antd";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any;
}

const Table: React.FC<Props> = ({id, children}) => {
  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      // 这里把组件的id返回，在拖拽结束时间里可以拿到这个id
      return {id};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item) => {
      return {
        title: (
          <div className="m-[16px] p-[16px]" data-component-id={item.props?.id}>
            {item.props.title}
          </div>
        ),
        dataIndex: item.props.dataIndex,
        key: item.props.dataIndex,
      };
    });
  }, [children]);

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLTableElement>}
      data-component-id={id}
      className="p-[24px] h-[100%] box-border"
      style={{
        border: canDrop ? "1px solid blue" : "none",
      }}
    >
      <AntdTable dataSource={[]} columns={columns} pagination={false} />
    </div>
  );
};

export default Table;
