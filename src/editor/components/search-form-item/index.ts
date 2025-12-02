import SearchFormItemDev from "./dev";
import SearchFormItemProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("SearchFormItem", {
    name: "SearchFormItem",
    desc: "搜索项-10",
    defaultProps: {},
    dev: SearchFormItemDev,
    prod: SearchFormItemProd,
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
    order: 10,
  });
};
