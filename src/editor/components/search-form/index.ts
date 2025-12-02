import SearchFormDev from "./dev";
import SearchFormProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("SearchForm", {
    name: "SearchForm",
    desc: "搜索区-9",
    defaultProps: {},
    dev: SearchFormDev,
    prod: SearchFormProd,
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
    order: 9,
  });
};
