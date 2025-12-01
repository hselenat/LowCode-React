import {useState} from "react";
import {Input} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import SelectVariableModal from "./select-variable-modal";

interface IValue {
  type: "static" | "variable";
  value: any;
}

interface Props {
  value?: IValue;
  onChange?: (value: IValue) => void;
}

const SettingFormItemInput: React.FC<Props> = ({value, onChange}) => {
  const [visible, setVisible] = useState(false);
  function valueChange(e: any) {
    onChange?.({
      type: "static",
      value: e?.target?.value,
    });
  }

  function select(record: any) {
    onChange?.({
      type: "variable",
      value: record.name,
    });
    setVisible(false);
  }
  console.log(value);
  return (
    <div className="flex gap-[8px]">
      <Input
        disabled={value?.type === "variable"}
        onChange={valueChange}
        value={value?.type === "static" || !value ? value?.value : ""}
      />

      <SettingOutlined
        className="cursor-pointer"
        onClick={() => setVisible(true)}
        style={{
          color: value?.type === "variable" ? "blue" : "",
        }}
      />
      <SelectVariableModal
        open={visible}
        onCancel={() => setVisible(false)}
        onSelect={select}
      />
    </div>
  );
};

export default SettingFormItemInput;
