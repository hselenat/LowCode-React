import {forwardRef, useRef, useState, useEffect} from "react";
import {Drawer, Button} from "antd";
import G6 from "@antv/g6";
import defaultLayout from "./default-layout";
import {data} from "./data";
import {registerNodes} from "./nodes";
import {registerLines} from "./lines";
import {getTreeDepth} from "./utils";

registerNodes();
registerLines();

const EventFlowDesign = ({flowData}: any, ref: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settingOpen, setSettingOpen] = useState(false);

  useEffect(() => {
    const {width} = containerRef.current?.getBoundingClientRect() || {};
    const depth = getTreeDepth(flowData || data);
    const graph = new G6.TreeGraph({
      container: containerRef.current,
      width,
      // 根据树的深度计算画布的高度
      height: depth * 40 + 56 * (depth - 1) + 200,
      linkCenter: true,
      layout: defaultLayout,
      defaultNode: {
        type: "start",
      },
      animateCfg: {
        duration: 150,
      },
    });
    // 初始化数据
    graph.data(flowData || data);
    // 渲染图
    graph.render();
    // 画布居中
    graph.fitCenter();

    return () => {
      graph.destroy();
    };
  }, [flowData]);

  function saveSetting() {}
  return (
    <div>
      <div ref={containerRef}></div>
      <Drawer
        title="设置"
        open={settingOpen}
        zIndex={1005}
        width={400}
        onClose={() => setSettingOpen(false)}
        extra={<Button onClick={() => saveSetting}>取消</Button>}
        destoryOnHidden={true}
      >
        345
      </Drawer>
    </div>
  );
};
export default forwardRef(EventFlowDesign);
