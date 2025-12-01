import PageDev from "./dev";
import PageProd from "./prod";
import type {Context} from "../../interface";

// 对外暴露一个注册组件的方法，这个方法可以同步/异步的返回组件
// 的配置，我们可以在任何地方和时机调用这个方法，进行组件注册
export default (ctx: Context) => {
  ctx.registerComponent("Page", {
    name: "Page",
    desc: "页面",
    defaultProps: {},
    dev: PageDev,
    prod: PageProd,
    setter: [
      {
        name: "title",
        label: "页面标题",
        type: "input",
      },
    ],
    order: 0,
  });
};
