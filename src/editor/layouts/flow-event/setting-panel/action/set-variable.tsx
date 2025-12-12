import {Form, Input, Select} from "antd";
import {useVariableStore} from "../../../../store/variable";

const FormItem = Form.Item;
/**
 * 操作设置面板
 * 设置变量 setVariable
 * @returns
 */
function SetVariableSetting({values}: {values: any}) {
  const {variables} = useVariableStore();
  return (
    <>
      <FormItem label="变量" name={["config", "variable"]}>
        <Select
          style={{width: 170}}
          options={variables.map((variable) => ({
            label: variable.remark,
            value: variable.name,
          }))}
        />
      </FormItem>
      {values?.config?.variable && (
        <FormItem label="值" name={["config", "value"]}>
          <Input style={{width: 170}} />
        </FormItem>
      )}
    </>
  );
}

export default SetVariableSetting;
