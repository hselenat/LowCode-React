import SearchFormDev from "./dev";
import SearchFormProd from "./prod";
import type {Context} from "../../interface";
import {ItemType} from "../../item-type";

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.SearchForm, {
    name: ItemType.SearchForm,
    desc: "搜索区",
    defaultProps: {},
    dev: SearchFormDev,
    prod: SearchFormProd,
    events: [
      {
        name: "onSearch",
        desc: "搜索",
      },
    ],
    order: 9,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
