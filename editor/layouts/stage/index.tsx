// import {Button} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";
import {useComponents, type Component} from "../../store/components";
import Space from "../../components/space";
import Page from "../../components/page";
import Button from "../../components/button";
import SelectedMask from "../../common/selected-mask";
import HoverMask from "../../common/hover-mask";

// const components: Component[] = [
//   {
//     id: 1,
//     name: "Button",
//     props: {
//       type: "primary",
//       children: "按钮",
//     },
//   },
//   {
//     id: 2,
//     name: "Space",
//     props: {
//       size: "large",
//     },
//     children: [
//       {
//         id: 3,
//         name: "Button",
//         props: {
//           type: "primary",
//           children: "按钮1",
//         },
//       },
//       {
//         id: 4,
//         name: "Button",
//         props: {
//           type: "primary",
//           children: "按钮2",
//         },
//       },
//     ],
//   },
// ];

const ComponentMap: {[key: string]: any} = {
  Button: Button,
  Space: Space,
  Page: Page,
};

const Stage: React.FC = () => {
  const {components, setCurComponentId, curComponentId} = useComponents();
  const selectedMaskRef = useRef<any>(null);
  const hoverMaskRef = useRef<any>(null);
  const [hoverComponentId, setHoverComponentId] = useState<number | null>(null);
  console.log("components", components);
  function renderComponent(components: Component[]): React.ReactNode {
    return components.map((component) => {
      // 普通用法
      //   switch (component.name) {
      //     case "Button":
      //       return <Button {...component.props}>{component.props.children}</Button>;
      //     case "Space":
      //       return (
      //         <Space {...component.props}>
      //           {renderComponent(component.children || [])}
      //         </Space>
      //       );
      //     default:
      //       return null;
      if (!ComponentMap[component.name]) return null;
      return React.createElement(
        ComponentMap[component.name],
        {
          key: component.id,
          id: component.id,
          "data-component-id": component.id,
          ...component.props,
        },
        component.props.children || renderComponent(component.children || [])
      );
    });
  }
  // 如果拖拽的组件是可以放置的，canDrop为true，通过这个可以给组件添加边框
  const [, dropRef] = useDrop({
    accept: [ItemType.Button, ItemType.Space],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return {id: 0};
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  // 添加点击事件，处理选中组件的UI
  useEffect(() => {
    // 获取当前点击的元素，并创建蒙层
    function createMask(e: any) {
      const path = e.composedPath();
      for (let i = 0; i < path.length; i++) {
        const ele = path[i]; // 拿到点击元素
        // 如果有自定义属性
        if (ele.getAttribute) {
          if (ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            setCurComponentId(componentId);
            console.log("点击的componentId", componentId);
            return;
          }
        }
      }
    }
    const container = document.querySelector(".stage");
    if (container) {
      // 点击事件添加在container上，而不是document上，是为了防止点击到子元素时，也会触发点击事件
      container.addEventListener("click", createMask, true);
    }
    return () => {
      container?.removeEventListener("click", createMask, true);
    };
  }, [setCurComponentId]);

  // 添加hover事件，处理hover组件逻辑
  useEffect(() => {
    // 获取当前hover的元素，并创建蒙层
    function createHover(e: any) {
      const path = e.composedPath();
      for (let i = 0; i < path.length; i++) {
        const ele = path[i]; // 拿到点击元素
        // 如果有自定义属性
        if (ele.getAttribute) {
          if (ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            if (curComponentId === componentId) {
              setHoverComponentId(null);
            } else {
              setHoverComponentId(Number(componentId));
            }
            console.log("hover的hoverComponentId", hoverComponentId);
            return;
          }
        }
      }
    }

    function removeHover() {
      setHoverComponentId(null);
    }
    const container = document.querySelector(".stage");
    if (container) {
      // hover事件添加在container上，而不是document上，是为了防止点击到子元素时，也会触发hover事件
      container.addEventListener("mouseover", createHover, true);
      container.addEventListener("mouseout", removeHover);
    }
    return () => {
      container?.removeEventListener("mouseover", createHover, true);
      container?.removeEventListener("mouseout", removeHover);
    };
  }, [curComponentId, hoverComponentId]);

  // 画布的组件更新后，重新渲染遮罩
  useEffect(() => {
    selectedMaskRef.current?.updatePosition();
  }, [components]);

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className="stage flex-1 h-[100vh]"
    >
      {renderComponent(components)}
      {curComponentId && (
        <SelectedMask
          ref={selectedMaskRef}
          componentId={curComponentId}
          containerClassName="select-mask-container"
          offsetContainerClassName="stage"
        />
      )}
      {hoverComponentId && (
        <HoverMask
          ref={hoverMaskRef}
          componentId={hoverComponentId}
          containerClassName="select-mask-container"
          offsetContainerClassName="stage"
        />
      )}
      {/* 挂载节点 */}
      <div className="select-mask-container"></div>
    </div>
  );
};

export default Stage;
