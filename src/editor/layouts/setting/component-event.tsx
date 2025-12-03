import {useState, useRef} from "react";
// import { type Component} from "../../store/components";
import {useComponentsStore} from "../../store/components";
import {getComponentById} from "../../utils";
import {Collapse, Drawer, Button} from "antd";
import FlowEvent from "../flow-event";
// import {componentEventMap} from "./componentEventMap";
// import { componentMethodMap } from "./componentMethodMap";
import {useComponentConfigStore} from "../../store/component-config";

const ComponentEvent: React.FC = () => {
  const {curComponentId, updateComponentProps, components} =
    useComponentsStore();
  // const [selectedComponent, setSelectedComponent] = useState<Component | null>();
  const {componentConfig} = useComponentConfigStore();
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const curComponent = getComponentById(Number(curComponentId), components);
  const flowEventRef = useRef<any>(null);

  // 事件类型改变
  // function typeChange(eventName: string, value: string) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       type: value,
  //     },
  //   });
  // }
  // 消息类型改变
  // function messageTypeChange(eventName: string, value: string) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       ...curComponent?.props?.[eventName],
  //       config: {
  //         ...curComponent?.props?.[eventName]?.config,
  //         type: value,
  //       },
  //     },
  //   });
  // }
  // 消息文本改变
  // function messageTextChange(eventName: string, value: string) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       ...curComponent?.props?.[eventName],
  //       config: {
  //         ...curComponent?.props?.[eventName]?.config,
  //         text: value,
  //       },
  //     },
  //   });
  // }

  // 改变选择被触发的组件
  // function componentChange(eventName: string, value: number) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   const component = getComponentById(value, components);
  //   setSelectedComponent(component);
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       ...curComponent?.props?.[eventName],
  //       config: {
  //         ...curComponent?.props?.[eventName]?.config,
  //         componentId: value,
  //       },
  //     },
  //   });
  // }

  // 组件方法改变
  // function componentMethodChange(eventName: string, value: string) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       ...curComponent?.props?.[eventName],
  //       config: {
  //         ...curComponent?.props?.[eventName]?.config,
  //         method: value,
  //       },
  //     },
  //   });
  // }

  // 脚本改变
  // function scriptChange(eventName: string, value: string) {
  //   if (!curComponentId) {
  //     return;
  //   }
  //   updateComponentProps(Number(curComponentId), {
  //     [eventName]: {
  //       ...curComponent?.props?.[eventName],
  //       config: {
  //         ...curComponent?.props?.[eventName]?.config,
  //         script: value,
  //       },
  //     },
  //   });
  // }

  function save() {
    if (!curComponentId) {
      return;
    }
    const value = flowEventRef.current?.save();
    updateComponentProps(Number(curComponentId), {
      [eventName]: value,
    });
    setOpen(false);
  }

  if (!curComponent) {
    return null;
  }

  return (
    <div className="px-[12px]">
      {(componentConfig[curComponent?.name]?.events || []).map((event) => {
        return (
          <Collapse
            key={event.name}
            defaultActiveKey={event.name}
            items={[
              {
                label: event.desc,
                key: event.name,
                children: (
                  <div className="text-center">
                    <Button
                      type="primary"
                      onClick={() => {
                        setOpen(true);
                        setEventName(event.name);
                      }}
                    >
                      设置事件流
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        );
      })}
      <Drawer
        title="设置事件流"
        open={open}
        zIndex={1000}
        width="100vw"
        onClose={() => setOpen(false)}
        extra={
          <Button type="primary" onClick={save}>
            保存
          </Button>
        }
        push={false}
        destroyOnHidden
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <FlowEvent
          flowData={curComponent?.props?.[eventName]}
          ref={flowEventRef}
        />
      </Drawer>
      {/* {componentEventMap[curComponent?.name || ""].map((setting) => (
        <Collapse key={setting.name} defaultActiveKey={setting.name}>
          <Collapse.Panel header={setting.label} key={setting.name}>
            <div className="flex items-center gap-[10px]">
              <span>动作：</span>
              <div>
                <Select
                  style={{width: 160}}
                  options={[
                    {
                      label: "显示提示",
                      value: "showMessage",
                    },
                    {
                      label: "组件方法",
                      value: "componentFunction",
                    },
                    {
                      label: "执行脚本",
                      value: "execScript",
                    },
                  ]}
                  value={curComponent?.props?.[setting.name]?.type}
                  onChange={(value) => typeChange(setting.name, value)}
                ></Select>
              </div>
            </div>
            {curComponent.props?.[setting.name]?.type === "showMessage" && (
              <div>
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div className="flex items-center gap-[10px]">
                    <span>类型：</span>
                    <div>
                      <Select
                        className="w-[160px]"
                        options={[
                          {
                            label: "成功",
                            value: "success",
                          },
                          {
                            label: "失败",
                            value: "error",
                          },
                        ]}
                        value={
                          curComponent?.props?.[setting.name]?.config?.type
                        }
                        onChange={(value) =>
                          messageTypeChange(setting.name, value)
                        }
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] mt-[12px]">
                  <span>文本：</span>
                  <div>
                    <Input
                      className="w-[160px]"
                      value={curComponent?.props?.[setting.name]?.config?.text}
                      onChange={(e) =>
                        messageTextChange(setting.name, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {curComponent.props?.[setting.name]?.type ===
              "componentFunction" && (
              <div className="flex flex-col gap-[12px] mt-[12px]">
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <div>组件：</div>
                  <div>
                    <TreeSelect
                      style={{width: 160}}
                      treeData={components}
                      fieldNames={{
                        label: "name",
                        value: "id",
                      }}
                      value={
                        curComponent?.props?.[setting.name]?.config?.componentId
                      }
                      onChange={(value) => {
                        componentChange(setting.name, value);
                      }}
                    ></TreeSelect>
                  </div>
                </div>
                {componentEventMap[selectedComponent?.name || ""] && (
                  <div className="flex algin-center gap-[10px]">
                    <div>方法：</div>
                    <div>
                      <Select
                        style={{width: 160}}
                        options={componentMethodMap[
                          curComponent?.name || ""
                        ]?.map((event) => ({
                          label: event.label,
                          value: event.name,
                        }))}
                        value={
                          curComponent?.props?.[setting.name]?.config?.method
                        }
                        onChange={(value) =>
                          componentMethodChange(setting.name, value)
                        }
                      ></Select>
                    </div>
                  </div>
                )}
              </div>
            )}
            {curComponent?.props?.[setting.name]?.type === "execScript" && (
              <div className="flex flex-col gap-[12px] mt-[12px]">
                <div className="flex align-center gap-[10px]">
                  <span>脚本：</span>
                  <div>
                    <Input.TextArea
                      defaultValue={`(function(ctx) {
                              // TODO
                              })(ctx) `}
                      className="w-[160px]"
                      rows={6}
                      value={
                        curComponent?.props?.[setting.name]?.config?.script
                      }
                      onChange={(e) =>
                        scriptChange(setting.name, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </Collapse.Panel>
        </Collapse>
      ))} */}
    </div>
  );
};

export default ComponentEvent;
