import {Form, TreeSelect, Select} from "antd";
import {useComponentsStore} from "../../../../store/components";
// import {ItemType} from "../../../../item-type";
import {getComponentById} from "../../../../utils";
import {useMemo} from "react";
import {useComponentConfigStore} from "../../../../store/component-config";

/**
 * 操作设置面板
 * 组件方法 componentMethod
 * @returns
 */

// const componentMethodMap = {
//   [ItemType.Button]: [
//     {
//       name: "startLoading",
//       label: "开始加载",
//     },
//     {
//       name: "endLoading",
//       label: "结束加载",
//     },
//   ],
// };
function ComponentMethodSetting({values}: {values: any}) {
  const {components} = useComponentsStore();
  const {componentConfig} = useComponentConfigStore();

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
      {componentConfig[component?.name || ""]?.methods && (
        <Form.Item label="方法" name={["config", "method"]}>
          <Select
            style={{width: 170}}
            options={componentConfig[component?.name || ""]?.methods!.map(
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
