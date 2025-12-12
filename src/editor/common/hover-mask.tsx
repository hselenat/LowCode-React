import {Dropdown, Space} from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {createPortal} from "react-dom";
import {useComponentsStore} from "../store/components";
import {getComponentById} from "../utils";
import {useComponentConfigStore} from "../store/component-config";

interface Props {
  /** hover中的组件id */
  componentId: number;
  /** 容器类名 */
  containerClassName: string;
  /** 相对容器类名 */
  offsetContainerClassName: string;
}

const HoverMask = (props: Props, ref: any) => {
  const {componentId, containerClassName, offsetContainerClassName} = props;
  // 动态存储更新位置信息
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    toolsTop: 0,
    toolsLeft: 0,
  });
  const {components, setCurComponentId} = useComponentsStore();
  const {componentConfig} = useComponentConfigStore();

  // 对外暴露更新位置方法
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
    // 计算工具栏的位置
    let toolsTop = top - containerTop + container.scrollTop; // 需要加上滚动条的偏移量
    let toolsLeft = left - containerLeft + width; // 需要加上组件的宽度
    if (toolsTop <= 0) {
      // 工具栏超出顶部，需要调整位置
      toolsTop -= -30;
      toolsLeft -= 10;
    }
    // 更新位置
    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      toolsTop,
      toolsLeft,
    });
  }

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = getComponentById(componentId, components);
    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent]);

  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(66, 133, 244, 0.04)",
          border: "1px dashed rgb(66, 133, 244)",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.toolsLeft,
          top: position.toolsTop,
          fontSize: "14px",
          color: "#ff4d4f",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((item) => ({
                key: item?.id || "",
                label: item?.name,
              })),
              onClick: ({key}) => {
                setCurComponentId(Number(key));
              },
            }}
            placement="bottomRight"
            disabled={parentComponents.length === 0}
            getPopupContainer={(node) => node.parentElement!}
          >
            <div
              style={{
                padding: "0 8px",
                backgroundColor: "#1890ff",
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {componentConfig[curComponent?.name || ""]?.desc}
            </div>
          </Dropdown>
        </Space>
      </div>
    </>,
    document.querySelector(`.${containerClassName}`)!
  );
};

export default forwardRef(HoverMask);
