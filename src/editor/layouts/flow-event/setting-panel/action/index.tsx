import {Form, Select} from "antd";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import ShowMessageSetting from "./show-message";
import ComponentMethodSetting from "./component-method";
import SetVariableSetting from "./set-variable";
import ExecScriptSetting from "./exec-script";
import AsyncTaskSetting from "./async-task";
import {useUpdateEffect} from "ahooks";
import RequestSetting from "./request";
import ConfirmSetting from "./confirm";

const FormItem = Form.Item;

/**
 * 操作设置面板
 * 显示提示 showMessage
 * 组件方法 componentMethod
 * 设置变量 setVariable
 * 执行脚本 execScript
 * 异步任务 asyncTask
 * 接口请求 request
 * 显示确认框 confirm
 * @returns
 */

const actionMap: any = {
  ShowMessage: ShowMessageSetting,
  ComponentMethod: ComponentMethodSetting,
  SetVariable: SetVariableSetting,
  ExecScript: ExecScriptSetting,
  AsyncTask: AsyncTaskSetting,
  Request: RequestSetting,
  Confirm: ConfirmSetting,
};

const EventActionTypeDesc: any = {
  ShowMessage: "显示提示",
  ComponentMethod: "组件方法",
  SetVariable: "设置变量",
  ExecScript: "执行脚本",
  AsyncTask: "异步任务",
  Request: "接口请求",
  Confirm: "显示确认框",
};

function ActionSettingPanel(
  {
    graphRef,
    curModelRef,
    setSettingOpen,
  }: {graphRef: any; curModelRef: any; setSettingOpen: any},
  ref: any
) {
  const [values, setValues] = useState<any>(curModelRef?.current?.config || {});
  const [form] = Form.useForm();

  useUpdateEffect(() => {
    form.setFieldsValue({
      config: null,
    });
  }, [values.type, form]);

  useImperativeHandle(
    ref,
    () => {
      return {
        save: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  function save(config: any) {
    let menus = [
      {
        label: "成功",
        key: "success",
        nodeType: "event",
        nodeName: "成功",
        eventKey: "success",
      },
      {
        label: "失败",
        key: "error",
        nodeType: "event",
        nodeName: "失败",
        eventKey: "error",
      },
      {
        label: "成功或失败",
        key: "finally",
        nodeType: "event",
        nodeName: "成功或失败",
        eventKey: "finally",
      },
    ];

    if (config.type === "Confirm") {
      menus = [
        {
          label: "确认",
          key: "confirm",
          nodeType: "event",
          nodeName: "确认",
          eventKey: "confirm",
        },
        {
          label: "取消",
          key: "cancel",
          nodeType: "event",
          nodeName: "取消",
          eventKey: "cancel",
        },
      ];
    }
    graphRef?.current?.updateItem(curModelRef?.current?.id, {
      ...curModelRef?.current,
      config,
      label: EventActionTypeDesc[values.type],
      menus,
    });
    setSettingOpen(false);
  }

  function valueChange(_: any, allValues: any) {
    setValues(allValues);
  }
  console.log(curModelRef.current?.config, "curModelRef.current?.config");
  return (
    <Form
      form={form}
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      initialValues={curModelRef.current?.config}
      onValuesChange={valueChange}
      onFinish={save}
    >
      <FormItem label="动作类型" name="type">
        <Select
          options={Object.keys(actionMap)
            .filter((key) => EventActionTypeDesc[key])
            .map((key) => ({
              label: EventActionTypeDesc[key],
              value: key,
            }))}
        />
      </FormItem>
      {actionMap[values.type] &&
        React.createElement(actionMap[values.type], {values})}
    </Form>
  );
}

export default forwardRef(ActionSettingPanel);
