import {Button, Input, message, Modal, Space} from "antd";
import {useComponentsStore} from "../../store/components";
import ComponentTree from "./component-tree";
import {useState} from "react";
import DefineVariable from "./define-variable";
import {usePageDataStore} from "../../store/page-data";
import type {ComponentConfig} from "../../interface";
// @ts-expect-error - 忽略generate-code模块的类型错误
import {generateCode} from "../../utils/generate-code";

const Header: React.FC = () => {
  const {mode, setMode, setCurComponentId, components} = useComponentsStore();
  const {resetData} = usePageDataStore();
  const typedComponents = components as unknown as ComponentConfig[];

  const [componentTreeVisible, setComponentTreeVisible] =
    useState<boolean>(false);
  const [defineVariableVisible, setDefineVariableVisible] =
    useState<boolean>(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [code, setCode] = useState("");

  const handleViewCode = () => {
    try {
      const generatedCode = generateCode(typedComponents);
      setCode(generatedCode);
      setCodeVisible(true);
    } catch (error) {
      console.error("生成代码失败:", error);
      setCode(`生成代码失败: ${error}`);
      setCodeVisible(true);
    }
  };

  return (
    <div className="h-[50px] flex items-center justify-end w-[100%] px-[24px] border-solid border-[1px] border-[#ccc]">
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
          <>
            <Button onClick={handleViewCode} type="primary">
              查看源码
            </Button>
            <Button onClick={() => setMode("edit")}>退出预览</Button>
          </>
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
      <Modal
        title="页面源码"
        open={codeVisible}
        onCancel={() => setCodeVisible(false)}
        footer={[
          <Button
            key="copy"
            type="primary"
            onClick={() => {
              navigator.clipboard
                .writeText(code)
                .then(() => {
                  message.success("代码已复制到剪贴板");
                })
                .catch(() => {
                  message.error("复制失败，请手动复制");
                });
            }}
          >
            复制代码
          </Button>,
          <Button key="close" onClick={() => setCodeVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
        height={600}
      >
        <Input.TextArea
          value={code}
          style={{
            backgroundColor: "#f5f5f5",
            fontSize: "14px",
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            minHeight: "400px",
            maxHeight: "500px",
            resize: "vertical",
          }}
          autoSize={{minRows: 15, maxRows: 25}}
          readOnly={false}
        />
      </Modal>
    </div>
  );
};

export default Header;
