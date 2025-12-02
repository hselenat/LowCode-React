import type {Context} from "../../interface";
import TableColumnDev from "./dev";
import TableColumnProd from "./prod";

export default (ctx: Context) => {
  ctx.registerComponent("TableColumn", {
    name: "TableColumn",
    desc: "表格列-6",
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
    setter: [
      {
        name: "type",
        label: "类型",
        type: "select",
        options: [
          {
            label: "文本",
            value: "text",
          },
          {
            label: "日期",
            value: "date",
          },
        ],
      },
      {
        name: "title",
        label: "标题",
        type: "input",
      },
      {
        name: "dataIndex",
        label: "字段",
        type: "input",
      },
    ],
    order: 6,
  });
};
