import {Button, Space} from "antd";
import {useComponentsStore} from "../../store/components";
import ComponentTree from "./component-tree";
import {useState} from "react";
import DefineVariable from "./define-variable";
import {usePageDataStore} from "../../store/page-data";

const Header: React.FC = () => {
  const {mode, setMode, setCurComponentId} = useComponentsStore();
  const {resetData} = usePageDataStore();

  const [componentTreeVisible, setComponentTreeVisible] =
    useState<boolean>(false);
  const [defineVariableVisible, setDefineVariableVisible] =
    useState<boolean>(false);

  return (
    <div className="h-[50px] flex items-center justify-end w-[100%] px-[24px]">
      {/* header - {mode} */}
      <div className="flex-1 font-mono font-bold">lowCode平台</div>
      <Space>
        {mode === "edit" && (
          <>
            <Button
              onClick={() => {
                setMode("preview");
                setCurComponentId(undefined);
                resetData();
              }}
            >
              预览
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setComponentTreeVisible(true);
              }}
            >
              查看大纲
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setDefineVariableVisible(true);
              }}
            >
              定义变量
            </Button>
          </>
        )}
        {mode === "preview" && (
          <Button onClick={() => setMode("edit")}>退出预览</Button>
        )}
      </Space>
      <ComponentTree
        open={componentTreeVisible}
        onCancel={() => setComponentTreeVisible(false)}
      />
      <DefineVariable
        open={defineVariableVisible}
        onCancel={() => setDefineVariableVisible(false)}
      />
    </div>
  );
};

export default Header;
