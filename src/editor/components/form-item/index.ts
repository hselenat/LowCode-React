import FormItemDev from "./dev";
import FormItemProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("FormItem", {
    name: "FormItem",
    desc: "表单项-8",
    defaultProps: {},
    dev: FormItemDev,
    prod: FormItemProd,
    setter: [
      {
        name: "url",
        label: "url",
        type: "input",
      },
    ],
    methods: [
      {
        name: "search",
        desc: "搜索",
      },
    ],
    order: 8,
  });
};
