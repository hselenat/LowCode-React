import {useDrag} from "react-dnd";
import {useComponentConfigStore} from "../store/component-config";
import {useEffect} from "react";

interface ComponentItemProps {
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  description: string;
  /** 拖拽结束回调 */
  onDragEnd: (data: {
    name: string;
    props: any;
    id?: number;
    desc: string;
  }) => void;
  /** 拖拽中回调 */
  onDragging?: () => void;
}

const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  onDragEnd,
  onDragging,
}) => {
  const {componentConfig} = useComponentConfigStore();
  const [{isDragging}, dragRef] = useDrag(
    () => ({
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
        onDragEnd?.({
          name,
          props,
          desc: description,
          ...dropResult,
        });
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [name, componentConfig]
  );

  useEffect(() => {
    if (onDragging) {
      onDragging();
    }
  }, [onDragging, isDragging]);

  const opacity = isDragging ? 0.4 : 1;
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
