import {useMemo} from "react";
import {ItemType} from "../../item-type";
import {useComponents} from "../../store/components";
import {getComponentById} from "../../store/components";
import {Collapse, Input, Select} from "antd";

export const componentEventMap = {
  [ItemType.Button]: [
    {
      name: "onClick",
      label: "点击事件",
    },
  ],
};

const ComponentEvent: React.FC = () => {
  const {curComponentId, updateComponentProps, components} = useComponents();

  const curComponent = useMemo(() => {
    return getComponentById(Number(curComponentId), components);
  }, [curComponentId]);

  // 事件类型改变
  function typeChange(eventName: string, value: string) {
    if (!curComponentId) {
      return;
    }
    updateComponentProps(Number(curComponentId), {
      [eventName]: {
        type: value,
      },
    });
  }
  // 消息类型改变
  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) {
      return;
    }
    updateComponentProps(Number(curComponentId), {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value,
        },
      },
    });
  }
  // 消息文本改变
  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) {
      return;
    }
    updateComponentProps(Number(curComponentId), {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
      },
    });
  }

  if (!curComponent) {
    return null;
  }

  return (
    <div className="w-[250px]">
      {componentEventMap[curComponent?.name || ""].map((setting) => (
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
                  ]}
                  value={curComponent?.props?.[setting.name]?.type}
                  onChange={(value) => typeChange(setting.name, value)}
                ></Select>
              </div>
            </div>
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
                    value={curComponent?.props?.[setting.name]?.config?.type}
                    onChange={(value) => messageTypeChange(setting.name, value)}
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
          </Collapse.Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default ComponentEvent;
