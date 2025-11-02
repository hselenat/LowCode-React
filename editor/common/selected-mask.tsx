import {createPortal} from "react-dom";
import {useState, forwardRef, useImperativeHandle, useEffect} from "react";
interface props {
  /** 选中的组件id */
  componentId: number;
  /** 容器类名 */
  containerClassName: string;
  /** 相对容器类名 */
  offsetContainerClassName: string;
}

function SelectedMask(props: props, ref: any) {
  const {componentId, containerClassName, offsetContainerClassName} = props;
  const containerEle = document.querySelector(`.${containerClassName}`);
  document.querySelector(`.${containerClassName}`);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // 对外暴露更新位置的方法
  useImperativeHandle(ref, () => ({
    updatePosition,
  }));

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  function updatePosition() {
    if (!componentId) return;
    const container = document.querySelector(`.${offsetContainerClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    // 获取节点位置
    const {top, left, width, height} = node.getBoundingClientRect();
    // 获取容器的位置
    const {top: containerTop, left: containerLeft} =
      container.getBoundingClientRect();
    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft,
      width,
      height,
    });
  }

  return createPortal(
    <div
      className={`${containerClassName} ${offsetContainerClassName}`}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
        border: "1px solid gray",
        pointerEvents: "none",
        zIndex: 999,
        borderRadius: "4px",
        boxSizing: "border-box",
      }}
    ></div>,
    containerEle
  );
}

export default forwardRef(SelectedMask);
