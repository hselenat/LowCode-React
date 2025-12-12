import {useDrop as useDndDrop} from "react-dnd";
import {getAcceptDrop} from "../utils/index";

export const useDrop = (
  id: number | undefined,
  componentName: string | undefined
) => {
  const [{canDrop}, dropRef] = useDndDrop(() => ({
    accept: getAcceptDrop(componentName!),
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      return {
        id,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return {
    dropRef,
    canDrop,
  };
};
