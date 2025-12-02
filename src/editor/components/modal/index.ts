import ModalDev from "./dev";
import ModalProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("Modal", {
    name: "Modal",
    desc: "对话框-4",
    defaultProps: {
      text: {
        type: "static",
        value: "对话框",
      },
    },
    dev: ModalDev,
    prod: ModalProd,
    setter: [
      {
        name: "type",
        label: "对话框",
        type: "select",
        options: [
          {
            name: "title",
            label: "页面标题",
            type: "input",
          },
        ],
      },
    ],
    methods: [
      {
        name: "onOk",
        desc: "确定",
      },
      {
        name: "onCancel",
        desc: "取消",
      },
    ],
    events: [
      {
        name: "click",
        desc: "点击事件",
      },
    ],
    order: 4,
  });
};
