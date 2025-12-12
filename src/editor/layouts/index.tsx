import React, {useRef, useState, useEffect} from "react";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import Header from "./header";
import Material from "./material";
import EditStage from "./stage/edit";
import ProdStage from "./stage/prod";
import Setting from "./setting";
import {useComponentsStore} from "../store/components";
import type {ComponentConfig} from "../interface";
import {useComponentConfigStore} from "../store/component-config";
import {Spin} from "antd";
import {usePageDataStore} from "../store/page-data";
import {useVariableStore} from "../store/variable";
import {clearComponentRef} from "../store/component-ref";

const Layout: React.FC = () => {
  const {mode} = useComponentsStore();
  const {setComponentConfig} = useComponentConfigStore();
  const componentConfigRef = useRef<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const {mergeData} = usePageDataStore();
  const {variables} = useVariableStore();
  const editStageRef = useRef<any>(null);
  // 注册组件
  function registerComponent(name: string, componentConfig: ComponentConfig) {
    componentConfigRef.current[name] = componentConfig;
  }
  // 加载组件配置
  async function loadComponentConfig() {
    // 初始化变量到全局数据中
    mergeData(
      variables.reduce((prev: any, variable) => {
        prev[variable.name] = variable.defaultValue;
        return prev;
      }, {})
    );

    // 匹配components文件夹下的index.ts文件，加载组件配置模块代码
    const modules = import.meta.glob("../components/*/index.ts", {eager: true});
    // 执行组件配置里的方法，传入注入组件方法
    const tasks = Object.values(modules).map((module: any) => {
      if (module.default) {
        return module.default({registerComponent});
      }
    });
    // 等待所有组件配置加载完成
    await Promise.all(tasks);
    // 注册组件到全局组件配置状态
    setComponentConfig(componentConfigRef.current);
    console.log("componentConfigRef.current", componentConfigRef.current);
    setLoading(false);
  }

  useEffect(() => {
    clearComponentRef();
    loadComponentConfig();
  }, []);

  function onDragging() {
    editStageRef.current?.updateSelectedMaskPosition();
  }

  if (loading) {
    return (
      <div className="text-center mt-[100px]">
        <Spin spinning={loading} />
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col">
      <div className="h-[50px] flex items-center border-b-[1px] border-b-[#e5e5e5]">
        <Header />
      </div>
      {/* <div className="flex-1 flex">
        <div className="w-[200px] bg-green-300">Material</div>
        <div className="flex-1 bg-blue-300">Stage</div>
        <div className="w-[200px] bg-orange-300">Setting</div>
      </div> */}
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={400} minSize={200}>
            <Material onDragging={onDragging} />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditStage ref={editStageRef} />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <ProdStage />
      )}
    </div>
  );
};

export default Layout;
