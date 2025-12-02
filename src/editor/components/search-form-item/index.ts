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
        label: "页面标题",
        type: "input",
        value: "标题",
      },
      {
        name: "dataIndex",
        label: "字段",
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
