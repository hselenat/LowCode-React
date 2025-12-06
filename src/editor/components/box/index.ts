import BoxDev from "./dev";
import BoxProd from "./prod";
import type {Context} from "../../interface";

export default (ctx: Context) => {
  return ctx.registerComponent("Box", {
    name: "Box",
    desc: "盒子", // 组件描述
    defaultProps: {
      text: {
        type: "static",
        value: "盒子",
      },
    },
    dev: BoxDev,
    prod: BoxProd,
    setter: [],
    methods: [],
    events: [],
    order: 0,
  });
};
