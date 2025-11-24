import {forwardRef, useRef, useState, useEffect} from "react";
import {Drawer, Button} from "antd";
import G6 from "@antv/g6";
import defaultLayout from "./default-layout";
import {data} from "./data";
import {registerNodes} from "./nodes";
import {registerLines} from "./lines";
import {getTreeDepth} from "./utils";
import ContextMenu from "./context-menu";

registerNodes();
registerLines();

const EventFlowDesign = ({flowData}: any, ref: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<any>({});
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const curModelRef = useRef<any>({}); // 保存当前选中的节点
  const graphRef = useRef<any>(null); // 保存当前选中的节点

  useEffect(() => {
    const {width} = containerRef.current?.getBoundingClientRect() || {};
    const depth = getTreeDepth(flowData || data);
    const graph = new G6.TreeGraph({
      container: containerRef.current,
      width,
      // 根据树的深度计算画布的高度
      height: depth * 40 + 56 * (depth - 1) + 400,
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
    // 保存当前的图实例
    graphRef.current = graph;
    // 绑定节点的点击事件
    graph.on("node:click", (evt: any) => {
      //   console.log("evt===>", evt);
      const {item, target} = evt;
      const targetType = target?.get("type");
      const name = target?.get("name");
      const model = item.getModel();

      if (
        ["condition", "action"].includes(model.type) &&
        targetType !== "marker"
      ) {
        curModelRef.current = item.getModel();
        setSettingOpen(true);
        setMenuOpen(false);
        return;
      }

      // 添加新的节点
      if (targetType === "marker" && name === "add-item") {
        // 显示选择菜单: 获取节点的位置，然后在正确的位置渲染选项菜单
        // 获取当前节点的位置
        const itemBox = item.getBBox();
        // 获取当前节点的子节点的位置
        const bbox = target.getBBox();
        console.log("bbox===>item", item);
        curModelRef.current = item.getModel();
        // 获取当前节点在画布上的位置
        const newBox = graph.getClientByPoint(
          bbox.x + itemBox.x + itemBox.width / 2 + 20,
          bbox.y + itemBox.y + itemBox.height / 2 + 6
        );
        // 保存当前的位置，用来渲染选项面板
        setTimeout(() => {
          setPosition({
            top: newBox.y,
            left: newBox.x,
          });
          // 展示选项菜单
          setMenuOpen(true);
          //   console.log("newBox===>", newBox);
        }, 10);
      } else if (name === "remove-item") {
        graph.removeChild(model.id);
      }
      //   console.log("item===>", item);
    });

    return () => {
      graph.destroy();
    };
  }, [flowData]);

  const onSelectHandle = (key: string) => {
    // 获取到需要新增的节点类型
    const menu = curModelRef.current?.menus?.find(
      (o: any) => o?.key === key.key
    );
    const type = menu?.nodeType;
    const name = menu?.nodeName;
    if (!curModelRef.current) return;
    const id = `n-${Math.random()}`;
    if (!curModelRef.children) curModelRef.current.children = [];
    let menus: any = [];
    if (["condition", "action"].includes(type)) {
      menus = [];
    } else if (type === "event") {
      menus = [
        {
          key: "action",
          label: "动作",
          nodeType: "action",
          nodeName: "动作",
          eventKey: menu.eventKey,
        },
        {
          key: "condition",
          label: "条件",
          nodeType: "condition",
          nodeName: "条件",
          eventKey: menu.eventKey,
        },
      ];
    }
    // push 到curModelRef中
    curModelRef.current.children.push({
      id,
      type,
      label: name,
      key,
      menus,
      conditionId: menu.conditionId,
      eventKey: menu.eventKey,
    });
    graphRef.current?.updateChild(curModelRef.current, curModelRef.current.id);
    setMenuOpen(false);
    curModelRef.current = null;
  };

  function saveSetting() {}
  return (
    <div>
      <div
        style={{
          height: "calc(100vh - 65px)",
          width: "100vw",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        ref={containerRef}
      ></div>
      <ContextMenu
        position={position}
        onSelect={onSelectHandle}
        items={curModelRef.current?.menus || data.menus}
        open={menuOpen}
      />

      <Drawer
        title="设置"
        open={settingOpen}
        zIndex={1005}
        width={300}
        onClose={() => setSettingOpen(false)}
        extra={<Button onClick={() => saveSetting}>确定</Button>}
        destoryOnHidden={true}
      >
        345
      </Drawer>
    </div>
  );
};
export default forwardRef(EventFlowDesign);
