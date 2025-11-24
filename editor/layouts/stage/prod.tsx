/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useRef} from "react";
import {useComponents, type Component} from "../../store/components";
import Space from "../../components/space";
import Page from "../../components/page";
import Button from "../../components/button";
import {message} from "antd";
import {componentEventMap} from "../../layouts/setting/component-event";
import {usePageDataStore} from "../../store/page-data";
import {useVariableStore} from "../../store/variable";

const ComponentMap: {[key: string]: React.FC} = {
  Button: Button as React.FC,
  Space: Space as React.FC,
  Page: Page as React.FC,
};

const ProdStage: React.FC = () => {
  const {components} = useComponents();
  const componentRefs = useRef<any>({});
  const {variables} = useVariableStore();
  const {data, setData} = usePageDataStore();
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

  // 获取组件实例
  function getComponentRef(componentId: string) {
    return componentRefs.current[componentId];
  }

  function execScript(script: string) {
    const func = new Function("ctx", script);
    const ctx = {
      // TODO 操作数据，通过组件操作自身的方法等，或者和浏览器相关的，或者操作dom的一些方法都可以通过脚本去实现
      // 组件自定义逻辑
      setData,
      getComponentRef,
    };
    // 注入上下文数据，组件可以通过ctx来操作数据
    func(ctx);
  }

  function formatProps(component: Component) {
    const props = Object.keys(component.props || {}).reduce<any>(
      (prev, cur) => {
        // 如果组件属性是对象，则判断是静态值还是变量
        if (typeof component.props[cur] === "object") {
          // 如果是静态值，则直接赋值。如果是变量，则取变量中的默认值
          if (component.props[cur]?.type === "static") {
            prev[cur] = component.props[cur]?.value;
          } else if (component.props[cur]?.type === "variable") {
            const variableName = component.props[cur].value;
            const variable = variables.find(
              (item) => item.name === variableName
            );
            // 如果data中有值，则取data中的值，否则取变量的默认值
            prev[cur] = data[variableName] || variable?.defaultValue || "";
          }
        } else {
          // 如果是变量，则取data的值
          prev[cur] = component.props[cur];
        }
        return prev;
      },
      {} as Record<string, unknown>
    );
    return props;
  }
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      let props = formatProps(component);
      props = {...props, ...handleEvent(component)};
      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            ref: (ref: any) => {
              componentRefs.current[component.id] = ref;
            },
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
          console.log("config===>", config);
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
            } else if (type === "componentFunction") {
              const component =
                componentRefs.current[Number(config?.componentId)];
              console.log("config===>componentFunction", config, component);
              if (component) {
                component[config?.method]?.();
              }
            } else if (type === "setVariable") {
              const {variableName, value} = config;
              setData(variableName, value);
            } else if (type === "execScript") {
              execScript(config.script);
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
