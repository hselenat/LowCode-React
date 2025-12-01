import {Form, Input, Select} from "antd";

/**
 * 操作设置面板
 * 提示信息 showMessage
 * @returns
 */
function ShowMessageSetting() {
  return (
    <>
      <Form.Item label="类型" name={["config", "type"]}>
        <Select
          style={{width: 170}}
          options={[
            {
              label: "成功",
              value: "success",
            },
            {
              label: "错误",
              value: "error",
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="文本" name={["config", "text"]}>
        <Input style={{width: 170}} />
      </Form.Item>
    </>
  );
}

export default ShowMessageSetting;
