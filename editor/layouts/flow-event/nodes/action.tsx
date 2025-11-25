import {COLLAPSE_ICON, EXPAND_ICON} from "../icons";

export const actionNode: any = {
  options: {
    size: [120, 40],
    style: {
      fill: "#F9F0FF",
      radius: 8,
      lineWidth: 1,
      stroke: "#B#7FEB",
      fillOpacity: "0.95",
    },
    stateStyles: {
      hover: {},
      selected: {},
    },
    labelCfg: {
      style: {
        fill: "#0000000",
        fontSize: 14,
        fontWeight: 400,
        fillOpacity: "0.7",
      },
    },
  },
  drawShape(cfg: any, group: any) {
    const styles = this.getShapeStyle(cfg);
    const h = styles.height;
    const w = styles.width;
    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        ...styles,
      },
    });
    group.addShape("marker", {
      attrs: {
        x: w / 2 - 20,
        y: 6,
        r: 6,
        stroke: "#ff4d4f",
        cursor: "pointer",
        symbol: COLLAPSE_ICON,
      },
      name: "remove-item",
    });
    // 有menus子节点时，添加展开图标
    if (cfg.menus?.length) {
      group.addShape("marker", {
        attrs: {
          x: 0,
          y: h / 2 + 7,
          r: 6,
          stroke: "#73d13d",
          cursor: "pointer",
          symbol: EXPAND_ICON,
        },
        name: "add-item",
      });
    }
    return keyShape;
  },
  // update更新节点后的操作，一般同afterDraw配合使用
  update(cfg: any, node: any) {
    const styles = this.getShapeStyle(cfg);
    const h = styles.height;
    const group = node.getContainer();
    const child = group.find((item: any) => {
      // 获取新增节点
      return item.get("name") === "add-item";
    });
    const text = group.find((item: any) => {
      return item.get("name") === "text-shape";
    });
    // 更新后的文案内容
    if (text) {
      text.attr({
        text: cfg.text || "",
      });
    }
    if (!child && cfg.menus?.length) {
      group.addShape("marker", {
        attrs: {
          x: 0,
          y: h / 2 + 7,
          r: 6,
          stroke: "#73d13d",
          cursor: "pointer",
          symbol: EXPAND_ICON,
        },
        name: "add-item",
      });
    }
  },
};
