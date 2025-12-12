import FormDev from "./dev";
import FormProd from "./prod";
import type {Context} from "../../interface";
import {ItemType} from "../../item-type";

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Form, {
    name: ItemType.Form,
    desc: "表单",
    defaultProps: {},
    dev: FormDev,
    prod: FormProd,
    setter: [
      {
        name: "defaultValue",
        label: "默认值",
        type: "input",
      },
      {
        name: "url",
        label: "接口地址",
        type: "input",
      },
    ],
    events: [
      {
        name: "onFinish",
        desc: "校验成功",
      },
    ],
    methods: [
      {
        name: "submit",
        desc: "提交",
      },
    ],
    order: 7,
    allowDrag: [ItemType.Page, ItemType.Space, ItemType.Modal],
  });
};
