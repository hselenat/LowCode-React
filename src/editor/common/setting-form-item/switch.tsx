import {SearchOutlined} from "@ant-design/icons";
import {Switch} from "antd";
import {useState} from "react";
import SelectVariableModal from "./select-variable-modal";

interface Value {
  type: "static" | "variable";
  value: any;
}

interface Props {
  value?: Value;
  onChange?: (value: Value) => void;
}

const SettingFormItemSwitch = ({value, onChange}: Props) => {
  const [visible, setVisible] = useState(false);

  function select(record: Value) {
    onChange?.({
      type: "variable",
      value: record.value,
    });
  }
  function valueChange(checked: boolean) {
    onChange?.({
      type: "static",
      value: checked,
    });
  }
  return (
    <div className="flex gap-[8px]">
      <Switch
        disabled={value?.type === "variable"}
        checked={value?.type === "static" || !value ? value?.value : false}
        onChange={valueChange}
        checkedChildren="隐藏"
        unCheckedChildren="显示"
      ></Switch>
      <SearchOutlined />
      <SelectVariableModal
        open={visible}
        onCancel={() => setVisible(false)}
        onSelect={select}
      ></SelectVariableModal>
    </div>
  );
};

export default SettingFormItemSwitch;
