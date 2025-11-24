import {Form, Select} from "antd";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import ShowMessageSetting from "./show-message";
import ComponentMethodSetting from "./component-method";
import SetVariableSetting from "./set-variable";
import ExecScriptSetting from "./exec-script";
import AsyncTaskSetting from "./async-task";

/**
 * 操作设置面板
 * 显示提示 showMessage
 * 组件方法 componentMethod
 * 设置变量 setVariable
 * 执行脚本 execScript
 * @returns
 */

const actionMap: any = {
  showMessage: ShowMessageSetting,
  componentMethod: ComponentMethodSetting,
  setVariable: SetVariableSetting,
  execScript: ExecScriptSetting,
  asyncTask: AsyncTaskSetting,
};

const EventActionTypeDesc: any = {
  showMessage: "显示提示",
  componentMethod: "组件方法",
  setVariable: "设置变量",
  execScript: "执行脚本",
  asyncTask: "异步任务",
};

function ActionSettingPanel(
  {graphRef, curModelRef, setSettingOpen}: any,
  ref: any
) {
  const [values, setValues] = useState<any>(curModelRef.current?.config || {});
  const [form] = Form.useForm();
  const valueChange = (_: any, allValues: any) => {
    setValues(allValues);
  };
  return (
    <Form form={form} initialValues={values} onValuesChange={valueChange}>
      <Form.Item label="动作类型" name="type">
        <Select
          options={[
            {label: "显示提示", value: "showMessage"},
            {label: "组件方法", value: "componentMethod"},
            {label: "设置变量", value: "setVariable"},
            {label: "执行脚本", value: "execScript"},
          ]}
        />
      </Form.Item>
      {actionMap[values.type] &&
        React.createElement(actionMap[values.type], {values})}
    </Form>
  );
}

export default forwardRef(ActionSettingPanel);
