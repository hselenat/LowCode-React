import {Segmented} from "antd";
import {useState} from "react";
import {useComponentsStore} from "../../store/components";
import type {SegmentedValue} from "antd/lib/segmented";
import ComponentAttr from "./component-attr";
import ComponentEvent from "./component-event";

const Setting: React.FC = () => {
  const {curComponentId, curComponent} = useComponentsStore();
  const [key, setKey] = useState<SegmentedValue>("属性");
  if (!curComponentId || !curComponent) return null;
  return (
    <div>
      <Segmented
        block
        options={["属性", "事件"]}
        value={key}
        onChange={setKey}
      />
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
};

export default Setting;
