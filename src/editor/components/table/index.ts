import TableDev from "./dev";
import TableProd from "./prod";
import type {Context} from "../../interface";
import {ItemType} from "../../item-type";

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Table, {
    name: ItemType.Table,
    desc: "表格",
    defaultProps: {},
    dev: TableDev,
    prod: TableProd,
    setter: [
      {
        name: "url",
        label: "url", // 接口地址：api/user/list
        type: "input",
      },
    ],
    methods: [
      {
        name: "search",
        desc: "搜索",
      },
      {
        name: "reload",
        desc: "刷新",
      },
    ],
    order: 5,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
