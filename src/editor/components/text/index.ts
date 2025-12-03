import TextDev from "./dev";
import TextProd from "./prod";
import type {Context} from "../../interface";

// 对外暴露一个注册组件的方法，这个方法可以同步/异步的返回组件
// 的配置，我们可以在任何地方和时机调用这个方法，进行组件注册
export default (ctx: Context) => {
  ctx.registerComponent("Text", {
    name: "Text",
    desc: "标题文本-2", // 组件描述
    defaultProps: {
      text: {
        type: "static",
        value: "标题文本",
      },
    },
    dev: TextDev,
    prod: TextProd,
    setter: [
      {
        name: "fontSize",
        label: "字体大小",
        type: "select",
        options: [
          {
            label: "正文",
            value: "normal",
          },
          {
            label: "一级标题",
            value: "h1",
          },
          {
            label: "二级标题",
            value: "h2",
          },
          {
            label: "三级标题",
            value: "h3",
          },
          {
            label: "四级标题",
            value: "h4",
          },
          {
            label: "五级标题",
            value: "h5",
          },
          {
            label: "六级标题",
            value: "h6",
          },
        ],
      },
    ],
    events: [
      {
        name: "click",
        desc: "点击事件",
      },
    ],
    order: 2,
  });
};
