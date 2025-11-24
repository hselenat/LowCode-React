/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, Input} from "antd";

/**
 * 操作设置面板
 * 组件方法 componentMethod
 * @returns
 */
function ComponentMethodSetting({values}: {values: any}) {
  console.log(values);
  return (
    <Form>
      <Form.Item label="组件方法" name="componentMethod">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}

export default ComponentMethodSetting;
