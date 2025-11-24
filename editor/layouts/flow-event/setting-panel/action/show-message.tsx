/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 提示信息 showMessage
 * @returns
 */
function ShowMessageSetting({values}: {values: any}) {
  console.log("showMessage", values);
  return (
    <Form>
      <Form.Item label="提示信息" name="showMessage">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}

export default ShowMessageSetting;
