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
  name: string;
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
  setter?: ComponentSetter[];
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
}

/**
 * 组件上下文
 */
export interface Context {
  registerComponent: (name: string, config: ComponentConfig) => void;
}
