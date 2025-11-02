import {Form, Input, Select} from "antd";
import {useEffect, useMemo} from "react";
import {ItemType} from "../../item-type";
import {useComponents, getComponentById} from "../../store/components";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      defaultValue: "primary",
      options: [
        {
          label: "普通按钮",
          value: "primary",
        },
        {
          label: "默认按钮",
          value: "default",
        },
      ],
    },
    {
      name: "children",
      label: "按钮文本",
      type: "input",
    },
  ],
  [ItemType.Space]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      defaultValue: "middle",
      options: [
        {
          label: "小",
          value: "small",
        },
        {
          label: "中",
          value: "middle",
        },
        {
          label: "大",
          value: "large",
        },
      ],
    },
  ],
  [ItemType.Page]: [
    {
      name: "title",
      label: "页面标题",
      type: "input",
    },
  ],
};
const ComponentAttr: React.FC = () => {
  const {components, curComponentId, updateComponentProps} = useComponents();
  // const curComponent = components[curComponentId];
  const curComponent = useMemo(() => {
    return getComponentById(Number(curComponentId), components);
  }, [curComponentId]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(curComponent?.props || {});
  }, [curComponentId, curComponent, form]);

  /** 动态渲染表单元素 */
  function renderFormElement(setting: any) {
    const {type, options} = setting;
    if (type === "select") {
      return <Select options={options} />;
    }
    if (type === "input") {
      return <Input />;
    }
  }

  function onValueChange(changeValues: any) {
    console.log(changeValues);
    if (curComponentId) {
      // 更新组件属性
      updateComponentProps(Number(curComponentId), changeValues);
    }
  }

  if (!curComponent) return null;

  return (
    <Form form={form} onValuesChange={onValueChange}>
      {componentSettingMap[curComponent.name].map((setting) => (
        <Form.Item
          name={setting.name}
          label={setting.label}
          initialValue={setting.defaultValue}
        >
          {renderFormElement(setting)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default ComponentAttr;
