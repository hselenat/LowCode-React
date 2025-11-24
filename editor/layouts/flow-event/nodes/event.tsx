/* eslint-disable @typescript-eslint/no-explicit-any */
import {COLLAPSE_ICON, EXPAND_ICON} from "../icons";

export const eventNode: any = {
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
        y: h / 2 + 7,
        r: 6,
        stroke: "#73d13d",
        cursor: "pointer",
        symbol: EXPAND_ICON,
      },
      name: "add-item",
    });
    group.addShape("marker", {
      attrs: {
        x: w / 2 + 20,
        y: h / 2 + 7,
        r: 6,
        stroke: "#73d13d",
        cursor: "pointer",
        symbol: COLLAPSE_ICON,
      },
      name: "remove-item",
    });

    return keyShape;
  },
};
