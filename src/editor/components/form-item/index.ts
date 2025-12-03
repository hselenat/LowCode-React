import FormItemDev from "./dev";
import FormItemProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("FormItem", {
    name: "FormItem",
    desc: "表单项-8",
    defaultProps: () => {
      return {
        name: {type: "static", value: new Date().getTime()},
        label: {type: "static", value: "标题"},
        // type: "input",
      };
    },
    dev: FormItemDev,
    prod: FormItemProd,
    setter: [
      {
        name: "type",
        label: "类型",
        type: "select",
        options: [
          {
            label: "输入框",
            value: "input",
          },
        ],
      },
      {
        name: "label",
        label: "标题",
        type: "input",
      },
      {
        name: "name",
        label: "字段",
        type: "input",
      },
    ],
    order: 8,
  });
};
