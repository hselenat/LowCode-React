import React, {useMemo} from "react";
import {Table as AntdTable} from "antd";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children?: any[];
}

const Table: React.FC<Props> = (props: Props) => {
  const {id, children} = props;
  const [{canDrop}, dropRef] = useDrop(() => ({
    accept: [ItemType.TableColumn],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return {id};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div className="m-[16px] p-[16px]" data-component-id={item.props?.id}>
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
      ref={dropRef as unknown as React.Ref<HTMLTableElement>}
      data-component-id={id}
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
