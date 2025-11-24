import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 执行脚本 execScript
 * @returns
 */
function ExecScriptSetting({values}: {values: any}) {
  console.log("execScript", values);
  return (
    <Form>
      <Form.Item label="执行脚本" name="execScript">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}

export default ExecScriptSetting;
