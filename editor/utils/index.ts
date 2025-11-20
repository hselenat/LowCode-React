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

function execScript(script: string) {
  const func = new Function("ctx", script);
  const ctx = {
    // TODO
  };
  func(ctx);
}

/**
 * 加载远程组件
 */
export async function loadRemoteComponent(url: string) {
  console.log(url);

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
  const func = new Function("module", "exports", "require", script);
  func(module, exports, require);
  return {default: module.exports} as any;
}
