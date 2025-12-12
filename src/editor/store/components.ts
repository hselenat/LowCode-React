import {create} from "zustand";
import {getComponentById} from "../utils";
import {createJSONStorage, persist} from "zustand/middleware";

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
  /** 组件是否隐藏 */
  hidden?: {
    /** 隐藏类型 */
    type: "static" | "variable";
    /** 隐藏值 */
    value: boolean | string;
  };
}

interface State {
  components: Component[];
  /** 当前选中的组件ID */
  curComponentId?: number | null;
  /** 当前选中的组件 */
  curComponent?: Component | null;
  /** 编辑模式或预览模式 */
  mode: "edit" | "preview";
  /** 编辑类型 */
  editType: "page" | "event";
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @param parentId 上级组件id
   * @returns
   */
  addComponent: (component: Component, parentId?: number) => void;
  /**
   * 设置当前组件id
   * @param componentId 当前组件id
   * @returns
   */
  setCurComponentId: (componentId?: number | null) => void;
  /**
   * 更新组件属性
   * @param componentId 组件id
   * @param props 新组件属性
   * @returns
   */
  updateComponentProps: (componentId: number, props: any) => void;
  /**
   * 更新组件
   * @param componentId 组件id
   * @param key key
   * @param value value
   * @returns
   */
  updateComponent: (
    componentId: number,
    key: keyof Component,
    value: any
  ) => void;
  /**
   * 设置模式
   * @param mode 模式
   * @returns
   */
  setMode: (mode: State["mode"]) => void;
  /**
   *  设置编辑类型
   * @param editType
   * @returns
   */
  setEditType: (editType: State["editType"]) => void;
  /**
   * 删除组件
   * @param componentId 组件id
   * @returns
   */
  deleteComponent: (componentId: number | null | undefined) => void;
}

/**
 * 根据id递归查找组件
 */
// export function getComponentById(
//   id: number,
//   components: Component[]
// ): Component | null {
//   if (!id) return null; // 如果没有id，直接返回null
//   for (const component of components) {
//     if (component.id === id) {
//       return component;
//     }
//     if (component.children && component.children.length > 0) {
//       const result = getComponentById(id, component.children);
//       if (result !== null) {
//         return result;
//       }
//     }
//   }
//   return null;
// }

export const useComponentsStore = create(
  persist<State & Action>(
    (set, get) => ({
      components: [
        {
          id: 1,
          name: "Page",
          props: {},
          desc: "页面",
        },
      ], // 初始化默认有一个页面
      // curComponentId: null,
      curComponent: null,
      mode: "edit",
      editType: "page",
      addComponent: (component: Component, parentId?: number) => {
        set((state: any) => {
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
      setCurComponentId: (componentId?: number | null) => {
        set((state: any) => ({
          curComponentId: componentId,
          curComponent: componentId
            ? getComponentById(componentId, state.components)
            : null,
        }));
      },
      updateComponentProps: (componentId: number, props: any) => {
        set((state: any) => {
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
      updateComponent: (
        componentId: number,
        key: keyof Component,
        value: any
      ) => {
        set((state: any) => {
          const component = getComponentById(componentId, state.components);
          if (component) {
            if (key === "desc") {
              component[key] = value;
            } else if (key === "hidden") {
              component[key] = value;
            }
            return {components: [...state.components]};
          }
          return {components: [...state.components]};
        });
      },
      setMode: (mode: "edit" | "preview") => {
        set({mode});
      },
      setEditType: (editType: "page" | "event") => set({editType}),
      deleteComponent: (componentId: number | null | undefined) => {
        if (!componentId) return;
        const component = getComponentById(componentId, get().components);
        if (component?.parentId) {
          const parentComponent = getComponentById(
            component?.parentId,
            get().components
          );
          if (parentComponent?.children) {
            parentComponent.children = parentComponent.children.filter(
              (item) => item.id !== +componentId
            );
            set({components: [...get().components]});
          }
        }
        // else {
        //   set({
        //     components: get().components.filter(
        //       (item) => item.id !== +componentId
        //     ),
        //   });
        // }
      },
    }),
    {
      name: "components",
      storage: createJSONStorage(() => localStorage),
      // 只需要持久化components属性，把其他值过滤掉
      partialize: (state: any) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["components"].includes(key))
        ) as any,
    }
  )
);
