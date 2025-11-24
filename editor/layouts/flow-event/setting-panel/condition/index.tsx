import {Button, Space, Input, Modal} from "antd";
import {forwardRef, useImperativeHandle, useState} from "react";
import {SettingOutlined} from "@ant-design/icons";

function ConditionSettingPanel(
  {graphRef, curModelRef, setSettingOpen}: any,
  ref: any
) {
  const [data, setData] = useState(curModelRef.current?.config || []);
  const [curIndex, setCurIndex] = useState(0);
  const [conditionVisible, setConditionVisible] = useState(false);
  const [conditionValue, setConditionValue] = useState(
    `(function(ctx){ \n\n})(ctx)`
  );

  useImperativeHandle(ref, () => {
    return {
      save: () => {
        graphRef.current?.updateItem(curModelRef.current.id, {
          ...curModelRef.current,
          config: data,
          menus: data.map((item: any) => {
            return {
              key: item.id,
              label: item.name,
              nodeType: "action",
              nodeName: "动作",
              conditionId: item.id,
            };
          }),
        });
        setSettingOpen(false);
      },
    };
  });

  function nameChange(value: any, index: number) {
    setData((prev: any) => {
      prev[index].name = value;
      return [...prev];
    });
  }
  function conditionChange(value: any, index: number) {
    setData((prev: any) => {
      prev[index].condition = value;
      return [...prev];
    });
  }
  return (
    <div>
      <div style={{marginTop: 0}}>
        <Space direction="vertical">
          {data.map((item: any, index: number) => {
            return (
              <Space key={item.id}>
                <span>{index + 1}</span>
                <Input
                  placeholder="条件名称"
                  value={item.name}
                  onChange={(e) => {
                    nameChange(e.target.value, index);
                  }}
                ></Input>
                <SettingOutlined
                  className="cursor-pointer "
                  onClick={() => {
                    setConditionVisible(true);
                    setCurIndex(index);
                    setConditionValue(
                      item.condition || `(function(ctx){ \n\n})(ctx)`
                    );
                  }}
                  style={{color: item.condition && "blue"}}
                ></SettingOutlined>
              </Space>
            );
          })}
        </Space>
      </div>
      <div className="mt-[20px]">
        <Button
          onClick={() => {
            setData((prev: any) => [
              ...prev,
              {id: new Date().getTime().toString()},
            ]);
          }}
        >
          添加条件
        </Button>
      </div>
      <Modal
        title="条件设置"
        visible={conditionVisible}
        zIndex={1007}
        onCancel={() => {
          setConditionVisible(false);
        }}
        onOk={() => {
          conditionChange(conditionValue, curIndex);
          setConditionVisible(false);
        }}
      >
        <div>
          {/* // todo 代码编辑器替换textArea */}
          <Input.TextArea
            value={conditionValue}
            rows={10}
            onChange={(e) => {
              setConditionValue(e.target.value);
            }}
          ></Input.TextArea>
        </div>
      </Modal>
    </div>
  );
}

export default forwardRef(ConditionSettingPanel);
