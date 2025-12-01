import {EXPAND_ICON} from "../icons";

export const startNode: any = {
  options: {
    size: [120, 40],
    style: {
      fill: "#E6F7FF",
      radius: 8,
      lineWidth: 1,
      stroke: "#1890FF",
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
    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        ...styles,
      },
    });
    group.addShape("marker", {
      attrs: {
        x: 0,
        y: h / 2 + 12,
        r: 6,
        stroke: "#73d13d",
        cursor: "pointer",
        symbol: EXPAND_ICON,
      },
      name: "add-item",
    });

    return keyShape;
  },
};
