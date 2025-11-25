import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 执行脚本 execScript
 * @returns
 */
function ExecScriptSetting() {
  return (
    <>
      <Form.Item label="脚本" name={["config", "script"]}>
        <Input.TextArea
          style={{width: 210}}
          rows={10}
          defaultValue={`(function (ctx) {
          // TODO
          })(ctx)`}
        />
      </Form.Item>
    </>
  );
}

export default ExecScriptSetting;
