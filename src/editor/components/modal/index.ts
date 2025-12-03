import ModalDev from "./dev";
import ModalProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("Modal", {
    name: "Modal",
    desc: "对话框",
    defaultProps: {
      title: {
        type: "static",
        value: "标题",
      },
    },
    dev: ModalDev,
    prod: ModalProd,
    setter: [
      {
        name: "title",
        label: "标题",
        type: "input",
      },
    ],
    methods: [
      {
        name: "open",
        desc: "显示",
      },
      {
        name: "close",
        desc: "隐藏",
      },
      {
        name: "startConfirmLoading",
        desc: "开始确认按钮loading",
      },
      {
        name: "endConfirmLoading",
        desc: "结束确认按钮loading",
      },
    ],
    events: [
      {
        name: "onOk",
        desc: "确定",
      },
      {
        name: "onCancel",
        desc: "取消",
      },
    ],
    order: 4,
  });
};
