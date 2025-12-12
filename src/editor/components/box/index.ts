import BoxDev from "./dev";
import BoxProd from "./prod";
import type {Context} from "../../interface";
import {ItemType} from "../../item-type";

export default (ctx: Context) => {
  return ctx.registerComponent(ItemType.Box, {
    name: ItemType.Box,
    desc: "盒子", // 组件描述
    defaultProps: {},
    dev: BoxDev,
    prod: BoxProd,
    setter: [],
    methods: [],
    events: [],
    order: 0,
    allowDrag: [ItemType.Page, ItemType.Space],
  });
};
