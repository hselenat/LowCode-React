import type {ItemType} from "antd/es/menu/interface";

/**
 * 组件属性配置
 */
export interface ComponentSetter {
  /**
   * 属性名称
   */
  name: string;
  /**
   * 属性标签
   */
  label: string;
  /**
   * 属性类型
   */
  type: string;
  /**
   * 属性默认值
   */
  default?: any;
  /**
   * 属性其他配置
   */
  [key: string]: any;
}

/**
 * 组件事件配置
 */
export interface ComponentEvent {
  /**
   * 事件名称
   */
  name: string;
  /**
   * 事件描述
   */
  desc: string;
  /**
   * 事件标签
   */
  label?: string;
}

/**
 * 组件方法配置
 */
export interface ComponentMethod {
  /**
   * 方法名称
   */
  name: string;
  /**
   * 方法描述
   */
  desc: string;
}

/**
 * 组件配置
 */
export interface ComponentConfig {
  /**
   * 组件名称
   */
  name: ItemType | string;
  /**
   * 组件描述
   */
  desc: string;
  /**
   * 组件默认属性
   */
  defaultProps:
    | {
        [key: string]: {
          type: "variable" | "static";
          value: any;
        };
      }
    | (() => {
        [key: string]: {
          type: "variable" | "static";
          value: any;
        };
      });
  /**
   * 编辑模式下加载的组件
   */
  dev: any; // React.FC;
  /**
   * 生产模式下加载的组件
   */
  prod: any; // React.FC;
  /**
   * 组件属性配置
   */
  setter?: ComponentSetter[] | any;
  /**
   * 组件方法
   */
  methods?: ComponentMethod[];
  /**
   * 组件事件
   */
  events?: ComponentEvent[];
  /**
   * 组件排序
   */
  order: number;
  /**
   * 组件是否在物料中隐藏
   */
  hiddenInMaterial?: boolean;
  /**
   * 允许放置到哪些组件上
   */
  allowDrag: ItemType | string[];
}

/**
 * 组件上下文
 */
export interface Context {
  registerComponent: (name: string, config: ComponentConfig) => void;
}

/**
 * 组件公共属性
 */
export interface CommonComponentProps {
  /**
   * 组件id
   */
  _id?: number;
  /**
   * 组件名称
   */
  _name?: string;
  /**
   * 组件描述
   */
  _desc?: string;
  /**
   * 组件子节点
   */
  children?: any;
  /**
   * 组件其他属性
   */
  [key: string]: any;
}
