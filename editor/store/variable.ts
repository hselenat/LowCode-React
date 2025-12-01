import {create} from "zustand";

export interface Variable {
  // 变量名
  name: string;
  // 变量类型
  type: string;
  // 默认值
  defaultValue: string;
  // 备注
  remark?: string;
}

interface State {
  variables: Variable[];
}

interface Action {
  /**
   * 添加组件变量
   */
  setVariables: (variables: Variable[]) => void;
}

export const useVariableStore = create<State & Action>((set) => ({
  variables: [],
  setVariables: (variables) => set({variables}),
}));
