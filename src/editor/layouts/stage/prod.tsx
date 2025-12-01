import React, {useRef} from "react";
import {useComponents, type Component} from "../../store/components";
import Space from "../../components/space";
import Page from "../../components/page";
import Button from "../../components/button";
import {message} from "antd";
import {componentEventMap} from "../../layouts/setting/componentEventMap";
import {usePageDataStore} from "../../store/page-data";
import {useVariableStore} from "../../store/variable";
import {type Node} from "../flow-event/data";

const ComponentMap: {[key: string]: any} = {
  Button: Button,
  Space: Space,
  Page: Page,
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

  // 事件处理函数
  const eventHandleMap: any = {
    showMessage: showMessageHandle,
    setVariable: setVariableHandle,
    componentMethod: componentMethodHandle,
    execScript: execScriptHandle,
  };

  // 测试执行脚本的代码
  //   (function (ctx) {
  // setTimeout(() => {
  // console.log(ctx);
  // const {componentId} = ctx;
  // ctx.getComponentRef(componentId).current.endLoading()
  // }, 1000)

  // 执行脚本
  async function execScriptHandle(item: any, actionConfig: any) {
    const {script} = actionConfig;
    if (script) {
      try {
        // 执行脚本
        execScript(script);
        // 执行成功后，执行后续成功事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "success"
        );
        execEventFlow(nodes || []);
      } catch (error) {
        console.log(`执行脚本失败：${error}`);
        // 执行失败后，执行后续的失败事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "error"
        );
        execEventFlow(nodes || []);
      } finally {
        // 执行后续成功或失败的finally事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "finally"
        );
        execEventFlow(nodes || []);
      }
    }
  }

  // 设置变量
  async function setVariableHandle(item: any, actionConfig: any) {
    const {variable, value} = actionConfig || {};
    if (variable && value !== undefined) {
      try {
        // 设置变量
        setData(variable, value);
        // 执行成功后，执行后续成功事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "success"
        );
        execEventFlow(nodes || []);
      } catch (error) {
        console.log(`设置变量${variable}失败：${error}`);
        // 执行失败后，执行后续的失败事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "error"
        );
        execEventFlow(nodes || []);
      } finally {
        // 执行后续成功或失败的finally事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "finally"
        );
        execEventFlow(nodes || []);
      }
    }
  }

  // 组件方法
  async function componentMethodHandle(item: any, actionConfig: any) {
    const {componentId, method} = actionConfig || {};
    if (componentId && actionConfig) {
      try {
        // 调用组件方法
        await componentRefs.current[componentId][method]();
        // 执行成功后，执行后续成功事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "success"
        );
        execEventFlow(nodes || []);
      } catch (error) {
        console.log(`调用组件${componentId}的方法${method}失败：${error}`);
        // 执行失败后，执行后续的失败事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "error"
        );
        execEventFlow(nodes || []);
      } finally {
        // 执行后续成功或失败的finally事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "finally"
        );
        execEventFlow(nodes || []);
      }
    }
  }

  // 显示消息
  async function showMessageHandle(item: any, actionConfig: any) {
    if (actionConfig?.type && actionConfig?.text) {
      try {
        if (actionConfig.type === "success") {
          // 显示成功消息
          message.success(actionConfig.text);
        } else if (actionConfig.type === "error") {
          // 显示错误消息
          message.error(actionConfig.text);
        }
        // 执行成功后，执行后续成功事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "success"
        );
        execEventFlow(nodes || []);
      } catch (error) {
        console.log(`显示消息失败：${error}`);
        // 执行失败后，执行后续的失败事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "error"
        );
        execEventFlow(nodes || []);
      } finally {
        // 执行后续成功或失败的finally事件
        const nodes = item.children?.filter(
          (o: Node) => o.eventKey === "finally"
        );
        execEventFlow(nodes || []);
      }
    }
  }

  function execScript(script: string) {
    // 第一版（不关注返回值）-- 开始
    // const func = new Function("ctx", script);
    // const ctx = {
    //   // TODO 操作数据，通过组件操作自身的方法等，或者和浏览器相关的，或者操作dom的一些方法都可以通过脚本去实现
    //   // 组件自定义逻辑
    //   setData,
    //   getComponentRef,
    // };
    // // 注入上下文数据，组件可以通过ctx来操作数据
    // func(ctx);
    // 第一版 -- 结束
    // 优化第一版
    const func = new Function("ctx", `return ${script}`);

    const ctx = {
      // TODO 操作数据，通过组件操作自身的方法等，或者和浏览器相关的，或者操作dom的一些方法都可以通过脚本去实现
      // 组件自定义逻辑
      setData,
      getComponentRef,
      getData,
    };
    return func(ctx);
  }

  // 获取数据
  const getData = (key: string) => {
    return (
      data[key] || variables.find((o) => o.name === key)?.defaultValue || ""
    );
  };

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

  // 执行事件流
  function execEventFlow(nodes: Node[] = []) {
    if (nodes.length === 0) {
      return;
    }
    nodes.forEach(async (item) => {
      // 判断是否是动作节点，如果是动作节点并且条件结果不为false，则执行动作
      if (item.type === "action" && item.conditionResult !== false) {
        // 根据不同动作类型执行不同动作
        await eventHandleMap[item.config.type](item, item.config.config);
      } else if (item.type === "condition") {
        // 如果是条件节点，则执行条件脚本，把结果注入到子节点conditionResult属性中
        const conditionResult = (item.config || [])
          .reduce((prev: any, cur: any) => {
            const result = execScript(cur.condition);
            prev[cur.id] = result;
            return prev;
          }, {})(
            // 把条件结果注入到子节点conditionResult属性中
            item.children || []
          )
          .forEach((child: any) => {
            child.conditionResult = !!conditionResult[child.conditionId];
          });
        // 递归执行子节点事件流
        execEventFlow(item.children || []);
      } else if (item.type === "event") {
        // 如果是事件节点，则执行事件子节点事件流
        execEventFlow(item.children || []);
      }
    });
  }

  function handleEvent(component: Component) {
    const props: any = {};
    if (componentEventMap[component.name]?.length) {
      componentEventMap[component.name]?.forEach((event) => {
        const eventConfig = component.props[event.name];
        console.log("eventConfig===>", eventConfig);
        if (eventConfig) {
          const {config} = eventConfig;
          console.log("config===>", config);
          props[event?.name] = () => {
            // 第一版：（通过if-else的方式处理事件类型） -- 开始
            // 如果动作类型是显示消息，下面根据消息类型调用显示的方法
            // if (type === "showMessage") {
            //   if (config?.type === "success") {
            //     message.success(config?.text || "");
            //     alert(config?.text || "");
            //   } else if (config?.type === "error") {
            //     message.error(config?.text || "");
            //   } else {
            //     message.info(config?.text || "");
            //   }
            // } else if (type === "componentFunction") {
            //   const component =
            //     componentRefs.current[Number(config?.componentId)];
            //   console.log("config===>componentFunction", config, component);
            //   if (component) {
            //     component[config?.method]?.();
            //   }
            // } else if (type === "setVariable") {
            //   const {variableName, value} = config;
            //   setData(variableName, value);
            // } else if (type === "execScript") {
            //   execScript(config.script);
            // }
            // 第一版 -- 结束
            // 优化处理：执行事件流处理
            if (eventConfig.children) {
              execEventFlow(eventConfig.children);
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
