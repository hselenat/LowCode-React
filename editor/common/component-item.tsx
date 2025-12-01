import {useDrag} from "react-dnd";
import {ItemType} from "../item-type";

interface ComponentItemProps {
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  description: string;
  /** 拖拽结果的回调 */
  onDragEnd: (data: {name: string; props?: Record<string, unknown>}) => void;
}

const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  onDragEnd,
}) => {
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log("dropResult", dropResult);
      if (!dropResult) return;
      if (onDragEnd) {
        onDragEnd({
          name,
          props: name === ItemType.Button ? {children: "按钮"} : {},
          ...dropResult,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}
      className="border-dashed border-[1px] border-[gray] bg-white cursor-move py-[8px] px-[20px] rounded-lg"
      style={{opacity}}
    >
      {description}
    </div>
  );
};

export default ComponentItem;
