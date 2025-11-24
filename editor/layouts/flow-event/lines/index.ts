import G6 from "@antv/g6";
export const registerLines = () => {
  G6.registerEdge("flow-line", {
    drawShape(cfg: any, group: any) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;

      const {style = {}} = cfg;
      const shape = group.addShape("path", {
        attrs: {
          stroke: style.stroke,
          path: [
            ["M", startPoint.x, startPoint.y], // 线的起始点
            ["L", startPoint.x, (startPoint.y + endPoint.y) / 2], // 线的中间点左边的线
            ["L", endPoint.x, (startPoint.y + endPoint.y) / 2], // 线的中间点右边的线
            ["L", endPoint.x, endPoint.y], // 线的结束点
          ],
        },
      });
      // 存在label文案，则添加文案
      if (cfg.label?.length) {
        group.addShape("text", {
          attrs: {
            text: cfg.label,
            fill: "#595959",
            textAlign: "center",
            textBaseline: "middle",
            x: endPoint.x,
            y:
              startPoint.x === endPoint.x
                ? (startPoint.y + endPoint.y) / 2
                : (startPoint.y + endPoint.y) / 2 +
                  (endPoint.y - startPoint.y) / 8,
          },
          name: "text",
        });
      }
      return shape;
    },
  });
};
