import {Form, Input, Select} from "antd";

const FormItem = Form.Item;

/**
 * 操作设置面板
 * 提示信息 showMessage
 * @returns
 */
function ShowMessageSetting() {
  return (
    <>
      <FormItem label="类型" name={["config", "type"]}>
        <Select
          style={{width: 170}}
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
        />
      </FormItem>
      <FormItem label="文本" name={["config", "text"]}>
        <Input style={{width: 170}} />
      </FormItem>
    </>
  );
}

export default ShowMessageSetting;
