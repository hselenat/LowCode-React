import ButtonDev from "./dev";
import ButtonProd from "./prod";
// import type {ComponentConfig} from "../../interface";
import type {Context} from "../../interface";

// 对外暴露一个注册组件的方法，这个方法可以同步/异步的返回组件
// 的配置，我们可以在任何地方和时机调用这个方法，进行组件注册
export default (ctx: Context) => {
  // 模拟生产中需要异步的去拉去组件的CDN文件的过程
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.registerComponent("Button", {
        name: "Button",
        desc: "按钮", // 组件描述
        defaultProps: {
          text: {
            type: "static",
            value: "按钮",
          },
        },
        dev: ButtonDev,
        prod: ButtonProd,
        setter: [
          {
            name: "type",
            label: "类型",
            type: "select",
            options: [
              {
                label: "主按钮",
                value: "primary",
              },
              {
                label: "次按钮",
                value: "default",
              },
            ],
          },
          {
            name: "text",
            label: "文本",
            type: "input",
          },
        ],
        methods: [
          {
            name: "startLoading",
            desc: "开始加载",
          },
          {
            name: "endLoading",
            desc: "结束加载",
          },
        ],
        events: [
          {
            name: "onClick",
            desc: "点击事件",
          },
        ],
        order: 3,
      });
      // 异步拉去组件的CDN文件，成功后resolve
      resolve({});
    }, 1000);
  });
};

// 以组件的维度导出配置文件。虽然可以实现我们更方便扩展组件的
// 需求，但是难以添加异步组件，比如远程组件是需要异步添加的
// export default {
//   name: "Button",
//   desc: "按钮", // 组件描述
//   defaultProps: {
//     text: {
//       type: "static",
//       value: "按钮",
//     },
//   },
//   dev: DevButton,
//   prod: ProdButton,
//   setter: [
//     {
//       name: "type",
//       label: "按钮类型",
//       type: "select",
//       options: [
//         {
//           label: "主按钮",
//           value: "primary",
//         },
//         {
//           label: "次按钮",
//           value: "default",
//         },
//       ],
//     },
//   ],
//   methods: [
//     {
//       name: "startLoading",
//       desc: "开始加载",
//     },
//     {
//       name: "endLoading",
//       desc: "结束加载",
//     },
//   ],
//   events: [
//     {
//       name: "click",
//       desc: "点击事件",
//     },
//   ],
//   order: 2,
// } as ComponentConfig;
