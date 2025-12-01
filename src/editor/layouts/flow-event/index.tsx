import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import {Drawer, Button} from "antd";
import G6 from "@antv/g6";
import defaultLayout from "./default-layout";
import {data} from "./data";
import {registerNodes} from "./nodes";
import {registerLines} from "./lines";
import {getTreeDepth} from "./utils";
import ContextMenu from "./context-menu";
import ActionSettingPanel from "./setting-panel/action";
import ConditionSettingPanel from "./setting-panel/condition";

registerNodes();
registerLines();

// 节点类型映射
const settingMap: any = {
  action: ActionSettingPanel,
  condition: ConditionSettingPanel,
};

const EventFlowDesign = ({flowData}: any, ref: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<any>({});
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const curModelRef = useRef<any>({}); // 保存当前选中的节点
  const graphRef = useRef<any>(null); // 保存当前选中的节点
  const settingRef = useRef<any>(null); // 保存当前选中的节点

  useEffect(() => {
    // 初始化画布
    if (!containerRef.current) return;
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
    // 添加节点后，更新画布，因为画布高度会根据节点数变化
    graph.on("afteradditem", () => {
      const newData = graph.save();
      const depth = getTreeDepth(newData);
      graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
    });
    // 删除节点后，更新画布
    graph.on("afterremoveitem", () => {
      const newData = graph.save();
      const depth = getTreeDepth(newData);
      graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
    });
    // 自定义线的类型：在连接线上，渲染出对应的条件名称
    graph.edge((config: any) => {
      // 获取线的源节点和目标节点
      const sourceNode = graph.findById(config.source);
      const targetNode = graph.findById(config.target);
      // 获取源节点和目标节点的配置
      const sourceModel = sourceNode?.getModel();
      const targetModel = targetNode?.getModel();
      // 如果源节点和目标节点都是条件节点，则使用条件线
      let label = "";
      // 如果是条件节点
      if (sourceModel?.type === "condition") {
        const sourceConfig = sourceModel?.config as
          | Array<{id: string; name: string}>
          | undefined;
        if (sourceConfig) {
          const foundItem = sourceConfig.find(
            (item: {id: string; name: string}) =>
              item.id === targetModel.conditionId
          );
          if (foundItem) {
            const {name} = foundItem;
            label = name;
          }
        }
      }
      return {
        type: "flow-line",
        label,
        style: {
          stroke: "#91d5ff",
        },
      };
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
      // 统一节点，不允许重复添加
      // if (model.id === curModelRef.current.id) {
      //   return;
      // }
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
    graph.on("canvas:click", () => {
      setMenuOpen(false);
      curModelRef.current = null;
    });

    return () => {
      graph.destroy();
    };
  }, [flowData]);

  const onSelectHandle = ({key}: any) => {
    // 获取到需要新增的节点类型
    const menu = curModelRef.current?.menus?.find((o: any) => o?.key === key);
    const type = menu?.nodeType;
    const name = menu?.nodeName;
    if (!curModelRef.current) return;
    const id = `n-${Math.random()}`;
    if (!curModelRef.current.children) curModelRef.current.children = [];
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
          eventKey: "action", // menu.eventKey,
        },
        {
          key: "condition",
          label: "条件",
          nodeType: "condition",
          nodeName: "条件",
          eventKey: "condition", // menu.eventKey,
        },
      ];
    }
    // TODO: 只有父节点是条件节点，才允许添加多个子节点
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

  useImperativeHandle(
    ref,
    () => {
      return {
        save: () => {
          return graphRef.current?.save();
        },
      };
    },
    [graphRef]
  );

  function saveSetting() {
    settingRef.current?.save();
  }

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
        items={curModelRef.current?.menus || []} // data.menus
        open={menuOpen}
      />

      <Drawer
        title="设置"
        open={settingOpen}
        zIndex={1005}
        width={300}
        onClose={() => setSettingOpen(false)}
        extra={<Button onClick={saveSetting}>确定</Button>}
        destroyOnHidden={true}
      >
        {settingMap[curModelRef.current?.type] &&
          React.createElement(settingMap[curModelRef.current?.type], {
            graphRef,
            curModelRef,
            setSettingOpen,
            ref: settingRef,
          })}
      </Drawer>
    </div>
  );
};
export default forwardRef(EventFlowDesign);
