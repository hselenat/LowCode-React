import {Form, TreeSelect, Select} from "antd";
import {useComponents} from "../../../../store/components";
import {ItemType} from "../../../../item-type";
import {getComponentById} from "../../../../utils";
import {useMemo} from "react";

/**
 * 操作设置面板
 * 组件方法 componentMethod
 * @returns
 */

const componentMethodMap = {
  [ItemType.Button]: [
    {
      name: "startLoading",
      label: "开始加载",
    },
    {
      name: "stopLoading",
      label: "结束加载",
    },
  ],
};
function ComponentMethodSetting({values}: {values: any}) {
  const {components} = useComponents();
  const component = useMemo(() => {
    if (values?.config?.componentId) {
      return getComponentById(values?.config?.componentId, components);
    }
  }, [values?.config?.componentId, components]);
  return (
    <>
      <Form.Item label="组件" name={["config", "componentId"]}>
        <TreeSelect
          style={{width: 170}}
          treeData={components}
          fieldNames={{value: "id", label: "name"}}
        />
      </Form.Item>
      {componentMethodMap[component?.name || ""] && (
        <Form.Item label="方法" name={["config", "method"]}>
          <Select
            style={{width: 170}}
            options={componentMethodMap[component?.name || ""].map(
              (method: any) => ({
                label: method.label,
                value: method.name,
              })
            )}
          />
        </Form.Item>
      )}
    </>
  );
}

export default ComponentMethodSetting;
