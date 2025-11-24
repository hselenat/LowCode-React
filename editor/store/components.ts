import {create} from "zustand";

// 处理画布的增删行为
export interface Component {
  /** 组件唯一标识 */
  id: number;
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  desc?: string;
  /** 组件父元素ID */
  parentId?: number;
  /** 组件属性 */
  props: any;
  /** 组件子元素 */
  children?: Component[];
}

interface State {
  components: Component[];
  /** 当前选中的组件ID */
  curComponentId?: number | null;
  /** 当前选中的组件 */
  curComponent?: Component | null;
  /** 编辑模式或预览模式 */
  mode: "edit" | "preview";
}

interface Action {
  /** 添加组件 */
  addComponent: (component: Component, parentId?: number) => void;
  /** 设置当前选中的组件ID */
  setCurComponentId: (componentId?: number) => void;
  /** 更新当前选择组件的属性 */
  updateComponentProps: (componentId: number, props: any) => void;
  /** 设置编辑模式或预览模式 */
  setMode: (mode: "edit" | "preview") => void;
}

/**
 * 根据id递归查找组件
 */
export function getComponentById(
  id: number,
  components: Component[]
): Component | null {
  if (!id) return null; // 如果没有id，直接返回null
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}

export const useComponents = create<State & Action>((set) => ({
  components: [
    {
      id: 1,
      name: "Page",
      desc: "页面组件",
      props: {},
    },
  ], // 初始化默认有一个页面
  curComponentId: null,
  curComponent: null,
  mode: "edit",
  addComponent: (component: Component, parentId?: number) => {
    set((state) => {
      // 如果有上级ID，把当前组件添加到父组件的子组件中
      if (parentId) {
        // 通过父组件id递归查找父组件
        const parentComponent = getComponentById(
          parentId || 0,
          state.components
        );
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        component.parentId = parentId;
        return {components: [...state.components]};
      }
      return {components: [...state.components, component]};
    });
  },
  setCurComponentId: (componentId?: number) => {
    set((state) => ({
      curComponentId: componentId,
      curComponent: componentId
        ? getComponentById(componentId, state.components)
        : null,
    }));
  },
  updateComponentProps: (componentId: number, props: any) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = {...component.props, ...props};
        if (componentId === state.curComponentId) {
          return {
            curComponent: component,
            components: [...state.components],
          };
        }
        return {components: [...state.components]};
      }
      return {components: [...state.components]};
    });
  },
  setMode: (mode: "edit" | "preview") => {
    set({mode});
  },
}));
