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
        value: "请输入文本内容",
      },
    },
    dev: TextDev,
    prod: TextProd,
    setter: [
      {
        name: "text",
        label: "文本内容",
        type: "input",
      },
      {
        name: "fontSize",
        label: "字体大小",
        type: "select",
        options: [
          {
            label: "正文",
            value: "text-base",
          },
          {
            label: "一级标题",
            value: "text-5xl",
          },
          {
            label: "二级标题",
            value: "text-4xl",
          },
          {
            label: "三级标题",
            value: "text-3xl",
          },
          {
            label: "四级标题",
            value: "text-2xl",
          },
          {
            label: "五级标题",
            value: "text-xl",
          },
          {
            label: "六级标题",
            value: "text-sm",
          },
        ],
      },
      {
        name: "fontWeight",
        label: "加粗",
        type: "select",
        options: [
          {
            label: "细体",
            value: "font-light",
          },
          {
            label: "正常",
            value: "font-normal",
          },
          {
            label: "加粗",
            value: "font-medium",
          },
          {
            label: "特粗",
            value: "font-bold",
          },
        ],
      },
      {
        name: "textColor",
        label: "字体颜色",
        type: "select",
        options: [
          {
            label: "继承",
            value: "text-inherit",
          },
          {
            label: "默认",
            value: "text-current",
          },
          {
            label: "黑色",
            value: "text-black",
          },
          {
            label: "白色",
            value: "text-white",
          },
          {
            label: "红色",
            value: "text-red-500",
          },
          {
            label: "蓝色",
            value: "text-blue-500",
          },
          {
            label: "绿色",
            value: "text-green-500",
          },
          {
            label: "黄色",
            value: "text-yellow-500",
          },
          {
            label: "灰色",
            value: "text-gray-500",
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
