import type {Context} from "../../interface";
import TableColumnDev from "./dev";
import TableColumnProd from "./prod";
import {ItemType} from "../../item-type";
import {setter} from "./setter-data";

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.TableColumn, {
    name: ItemType.TableColumn,
    desc: "表格列",
    defaultProps: () => {
      return {
        dataIndex: {
          type: "static",
          value: `col_${new Date().getTime()}`,
        },
        title: {
          type: "static",
          value: "标题",
        },
      };
    },
    dev: TableColumnDev,
    prod: TableColumnProd,
    setter,
    order: 6,
    allowDrag: [ItemType.Table],
  });
};
