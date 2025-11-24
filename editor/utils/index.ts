/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Component} from "../stores/components";
import React from "react";
/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}

// 源代码
// function app() {
//     return <div>test</div>
// }
// umd打包之后的内容，这里只是示例：
// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
//   typeof define === 'function' && define.amd ? define(['react'], factory) :
//   (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.dbfuButton = factory(global.React));
// })(this, (function (React) {
//     'use strict';
//     function RemoteComponent() {
//         return (React.createElement("div", null, "test"));
//     }
//     return RemoteComponent;
// }));

/**
 * 加载远程组件
 */
export async function loadRemoteComponent(url: string) {
  console.log(url);
  // 定义一个脚本
  const script = await fetch(url).then((res) => res.text());
  console.log(script);
  const module = {exports: {}};
  const exports = {};
  // 因为我们使用的是react，所以需要把react注入进去
  const require = (id: string) => {
    if (id === "react") {
      return React;
    }
  };
  // 使用new Function()动态执行这段脚本，再把module、exports和require这些变量注入进去
  const func = new Function("module", "exports", "require", script);
  func(module, exports, require);
  return {default: module.exports} as any;
}
