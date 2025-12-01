import {Form, Select} from "antd";
import {useEffect, useMemo} from "react";
// import {ItemType} from "../../item-type";
import {useComponents, getComponentById} from "../../store/components";
import SettingFormItemInput from "../../common/setting-form-item/input";
import {useComponentConfigStore} from "../../store/component-config";

// const componentSettingMap = {
//   [ItemType.Button]: [
//     {
//       name: "type",
//       label: "按钮类型",
//       type: "select",
//       defaultValue: "primary",
//       options: [
//         {
//           label: "普通按钮",
//           value: "primary",
//         },
//         {
//           label: "默认按钮",
//           value: "default",
//         },
//       ],
//     },
//     {
//       name: "text",
//       label: "按钮文本",
//       type: "input",
//     },
//   ],
//   [ItemType.Space]: [
//     {
//       name: "size",
//       label: "间距大小",
//       type: "select",
//       defaultValue: "middle",
//       options: [
//         {
//           label: "小",
//           value: "small",
//         },
//         {
//           label: "中",
//           value: "middle",
//         },
//         {
//           label: "大",
//           value: "large",
//         },
//       ],
//     },
//   ],
//   [ItemType.Page]: [
//     {
//       name: "title",
//       label: "页面标题",
//       type: "input",
//     },
//   ],
// };

const ComponentAttr: React.FC = () => {
  const {components, curComponentId, updateComponentProps} = useComponents();
  // const curComponent = components[curComponentId];
  const curComponent = useMemo(() => {
    return getComponentById(Number(curComponentId), components);
  }, [curComponentId]);
  const {componentConfig} = useComponentConfigStore();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(curComponent?.props);
  }, [curComponentId, curComponent, form]);

  // 动态渲染表单元素
  function renderFormElement(setting: any) {
    const {type, options} = setting;
    if (type === "select") {
      return <Select options={options} />;
    }
    if (type === "input") {
      return <SettingFormItemInput />;
    }
  }

  function onValueChange(changeValues: any) {
    if (curComponentId) {
      // 更新组件的props
      updateComponentProps(Number(curComponentId), changeValues);
    }
  }

  if (!curComponent) return null;
  return (
    <Form form={form} onValuesChange={onValueChange}>
      {(componentConfig[curComponent.name]?.setter || []).map(
        (setting: any) => (
          <Form.Item
            name={setting.name}
            label={setting.label}
            initialValue={setting.defaultValue}
            key={setting.name}
          >
            {renderFormElement(setting)}
          </Form.Item>
        )
      )}
    </Form>
  );
};

export default ComponentAttr;
