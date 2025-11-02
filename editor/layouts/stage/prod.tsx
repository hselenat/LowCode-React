import React from "react";
import {useComponents, type Component} from "../../store/components";
import Space from "../../components/space";
import Page from "../../components/page";
import Button from "../../components/button";
import {message} from "antd";
import {componentEventMap} from "../../layouts/setting/component-event";

const ComponentMap: {[key: string]: React.FC} = {
  Button: Button as React.FC,
  Space: Space as React.FC,
  Page: Page as React.FC,
};

const ProdStage: React.FC = () => {
  const {components} = useComponents();
  //   function formatProps(component: Component) {
  //     const props = Object.keys(component.props || {}).reduce<any>(
  //       (prev, cur) => {
  //         // 如果组件属性是对象，则判断是静态值还是变量
  //         if (typeof component.props[cur] === "object") {
  //           // 如果是静态值，则直接赋值
  //           prev[cur] = component.props[cur]?.value;
  //         } else {
  //           // 如果是变量，则取data的值
  //           prev[cur] = component.props[cur];
  //         }
  //       },
  //       {} as Record<string, unknown>
  //     );
  //     return props;
  //   }
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      let props = component.props || {}; // formatProps(component);
      props = {...props, ...handleEvent(component)};
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

  function handleEvent(component: Component) {
    const props: any = {};
    if (componentEventMap[component.name]?.length) {
      componentEventMap[component.name]?.forEach((event) => {
        const eventConfig = component.props[event.name];
        console.log("eventConfig===>", eventConfig);
        if (eventConfig) {
          const {type, config} = eventConfig;
          console.log("type===>", type);
          props[event?.name] = () => {
            // 如果动作类型是显示消息，下面根据消息类型调用显示的方法
            if (type === "showMessage") {
              if (config?.type === "success") {
                message.success(config?.text || "");
                alert(config?.text || "");
              } else if (config?.type === "error") {
                message.error(config?.text || "");
              } else {
                message.info(config?.text || "");
              }
            }
          };
        }
      });
    }
    return props;
  }

  return <div>{renderComponents(components)}</div>;
};

export default ProdStage;
