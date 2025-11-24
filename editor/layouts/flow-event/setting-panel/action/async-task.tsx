import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 异步任务 asyncTask
 * @returns
 */
function AsyncTaskSetting({values}: {values: any}) {
  console.log(values);
  return (
    <Form>
      <Form.Item label="异步任务" name="asyncTask">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}

export default AsyncTaskSetting;
