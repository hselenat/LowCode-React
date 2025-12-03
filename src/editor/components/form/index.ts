import FormDev from "./dev";
import FormProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  ctx.registerComponent("Form", {
    name: "Form",
    desc: "表单",
    defaultProps: {},
    dev: FormDev,
    prod: FormProd,
    setter: [
      {
        name: "url",
        label: "url",
        type: "input",
      },
    ],
    events: [
      {
        name: "onSaveSuccess",
        desc: "保存成功",
      },
      {
        name: "onSaveFail",
        desc: "保存失败",
      },
    ],
    methods: [
      {
        name: "submit",
        desc: "提交",
      },
    ],
    order: 7,
  });
};
