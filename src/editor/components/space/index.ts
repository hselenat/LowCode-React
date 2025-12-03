import SpaceDev from "./dev";
import SpaceProd from "./prod";
// import type {ComponentConfig} from "../../interface";
import type {Context} from "../../interface";

// 对外暴露一个注册组件的方法，这个方法可以同步/异步的返回组件
// 的配置，我们可以在任何地方和时机调用这个方法，进行组件注册
export default (ctx: Context) => {
  ctx.registerComponent("Space", {
    name: "Space",
    desc: "间距",
    defaultProps: {
      size: {
        type: "static",
        value: "middle",
      },
      direction: {
        type: "static",
        value: "horizontal",
      },
    },
    dev: SpaceDev,
    prod: SpaceProd,
    setter: [
      {
        name: "direction",
        label: "间距方向",
        type: "select",
        options: [
          {
            label: "水平",
            value: "horizontal",
          },
          {
            label: "垂直",
            value: "vertical",
          },
        ],
      },
      {
        name: "size",
        label: "间距大小", // 字段名称
        type: "select",
        options: [
          {
            label: "小",
            value: "small",
          },
          {
            label: "中",
            value: "middle",
          },
          {
            label: "大",
            value: "large",
          },
        ],
      },
    ],
    order: 1,
  });
};
