import {useDrag} from "react-dnd";
import {useComponentConfigStore} from "../store/component-config";

interface ComponentItemProps {
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  description: string;
  /** 拖拽结果的回调 */
  onDragEnd: (data: {name: string; props: any; id?: number}) => void;
}

const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  onDragEnd,
}) => {
  const {componentConfig} = useComponentConfigStore();
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log("dropResult", dropResult);
      if (!dropResult) return;
      let props: any = {};
      const defaultProps = componentConfig[name]?.defaultProps;
      if (defaultProps) {
        if (typeof defaultProps === "function") {
          props = defaultProps();
        } else {
          props = defaultProps || {};
        }
      }
      if (onDragEnd) {
        onDragEnd({
          name,
          props,
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
