import React, {useEffect, useRef, useState} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type";
import {useComponents, type Component} from "../../store/components";
import Space from "../../components/space";
import Page from "../../components/page";
import Button from "../../components/button";
import SelectedMask from "../../common/selected-mask";
import HoverMask from "../../common/hover-mask";
import {loadRemoteComponent} from "../../utils";

// 动态加载组件，避免首屏加载所有组件
// const LazyButton = React.lazy(() => import("../../components/button"));
// const LazyRemoteComponent = React.lazy(() =>
//   loadRemoteComponent(
//     "https://cdn.jsdelivr.net/npm/dbfu-remote-component@1.0.1/dist/bundle.umd.js'"
//   )
// );

const ComponentMap: {[key: string]: any} = {
  Button: Button,
  Space: Space,
  Page: Page,
  RemoteComponent: React.lazy(() =>
    loadRemoteComponent(
      "https://cdn.jsdelivr.net/npm/dbfu-remote-component@1.0.1/dist/bundle.umd.js"
    )
  ),
};

const EditStage: React.FC = () => {
  const {components, setCurComponentId, curComponentId} = useComponents();
  const selectedMaskRef = useRef<any>(null);
  const [hoverComponentId, setHoverComponentId] = useState<number | null>(null);
  console.log("components", components);
  function formatProps(component: Component) {
    const props = Object.keys(component.props || {}).reduce<any>(
      (prev, cur) => {
        if (typeof component.props[cur] === "object") {
          if (component.props[cur]?.type === "static") {
            prev[cur] = component.props[cur].value;
          } else if (component.props[cur]?.type === "variable") {
            const variableName = component.props[cur].value;
            prev[cur] = `\${${variableName}}`;
          }
        } else {
          prev[cur] = component.props[cur];
        }
        return prev;
      },
      {}
    );
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) return null;
      const props = formatProps(component);
      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            ...component.props,
            ...props,
          },
          component.props.children || renderComponents(component.children || [])
        );
      }
      return null;
    });
  }
  // 如果拖拽的组件是可以放置的，canDrop为true，通过这个可以给组件添加边框
  const [, dropRef] = useDrop({
    // 可以接受的元素类型
    accept: [ItemType.Button, ItemType.Space, ItemType.RemoteComponent],
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
  }, [curComponentId, setCurComponentId]);

  // 添加hover事件，处理hover组件逻辑
  useEffect(() => {
    // 获取当前hover的元素，并创建蒙层
    function createHover(e: any) {
      const path = e.composedPath();
      for (let i = 0; i < path.length; i++) {
        const ele = path[i]; // 拿到点击元素
        // 如果有自定义属性
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
          const componentId = ele.getAttribute("data-component-id");
          if (curComponentId === componentId) {
            setHoverComponentId(null);
          } else {
            setHoverComponentId(componentId);
          }
          console.log("hover的hoverComponentId", hoverComponentId);
          return;
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
  }, [curComponentId, hoverComponentId, setHoverComponentId]);

  // 画布的组件更新后，重新渲染遮罩
  useEffect(() => {
    selectedMaskRef.current?.updatePosition();
  }, [components]);

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className="stage flex-1 h-[100vh]"
    >
      {renderComponents(components)}
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
          ref={selectedMaskRef}
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

export default EditStage;
