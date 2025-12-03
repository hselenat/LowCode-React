import SearchFormItemDev from "./dev";
import SearchFormItemProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("SearchFormItem", {
    name: "SearchFormItem",
    desc: "搜索项",
    defaultProps: () => {
      return {
        name: {type: "static", value: new Date().getTime()},
        label: {type: "static", value: "标题"},
        // type: 'input',
      };
    },
    dev: SearchFormItemDev,
    prod: SearchFormItemProd,
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
    order: 10,
  });
};
