/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 设置变量 setVariable
 * @returns
 */
function SetVariableSetting({values}: {values: any}) {
  console.log("setVariable", values);
  return (
    <Form>
      <Form.Item label="设置变量" name="setVariable">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}

export default SetVariableSetting;
