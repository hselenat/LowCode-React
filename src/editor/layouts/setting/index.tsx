import {Segmented} from "antd";
import {useState} from "react";
import {useComponentsStore} from "../../store/components";
import type {SegmentedValue} from "antd/lib/segmented";
import ComponentAttr from "./component-attr";
import ComponentEvent from "./component-event";

const Setting: React.FC = () => {
  const {curComponentId} = useComponentsStore();
  const [key, setKey] = useState<SegmentedValue>("attr");
  if (!curComponentId) return null;
  return (
    <div>
      <Segmented
        block
        options={[
          {label: "属性", value: "attr"},
          {label: "事件", value: "event"},
        ]}
        value={key}
        onChange={setKey}
      />
      <div className="pt-[20px]">
        {key === "attr" && <ComponentAttr />}
        {key === "event" && <ComponentEvent />}
      </div>
    </div>
  );
};

export default Setting;
