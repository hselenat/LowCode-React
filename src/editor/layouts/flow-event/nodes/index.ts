import G6 from "@antv/g6";

import {startNode} from "./start";
import {eventNode} from "./event";
import {actionNode} from "./action";
import {conditionNode} from "./condition";

export const registerNodes = () => {
  // 注册节点
  G6.registerNode("start", startNode, "rect");
  G6.registerNode("event", eventNode, "rect");
  G6.registerNode("action", actionNode, "rect");
  G6.registerNode("condition", conditionNode, "rect");
};
