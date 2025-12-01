import {Form, Input, Select} from "antd";
import {useVariableStore} from "../../../../store/variable";

/**
 * 操作设置面板
 * 设置变量 setVariable
 * @returns
 */
function SetVariableSetting({values}: {values: any}) {
  const {variables} = useVariableStore();
  return (
    <>
      <Form.Item label="变量" name={["config", "variable"]}>
        <Select
          style={{width: 170}}
          options={variables.map((variable) => ({
            label: variable.remark,
            value: variable.name,
          }))}
        />
      </Form.Item>
      {values.config.variable && (
        <Form.Item label="值" name={["config", "value"]}>
          <Input style={{width: 170}} />
        </Form.Item>
      )}
    </>
  );
}

export default SetVariableSetting;
