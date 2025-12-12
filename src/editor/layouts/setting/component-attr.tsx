import {Form, Input} from "antd";
import React, {useEffect} from "react";
// import {ItemType} from "../../item-type";
import {useComponentsStore} from "../../store/components";
import {useComponentConfigStore} from "../../store/component-config";
import SettingFormItemSwitch from "../../common/setting-form-item/switch";
import CommonSetter from "../../common/common-setter";

const ComponentAttr: React.FC = () => {
  const {curComponent, curComponentId, updateComponentProps, updateComponent} =
    useComponentsStore();
  const {componentConfig} = useComponentConfigStore();
  const [form] = Form.useForm();

  useEffect(() => {
    const data = form.getFieldsValue(true);
    const newData = Object.keys(data).reduce((prev: any, key) => {
      prev[key] = null;
      return prev;
    }, {});
    // 初始化表单
    form.setFieldsValue({...newData, ...curComponent?.props});
  }, [curComponent, form]);

  function onValueChange(changeValues: any) {
    if (curComponentId) {
      // 更新组件的props
      updateComponentProps(Number(curComponentId), changeValues);
    }
  }

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={onValueChange}
      labelCol={{span: 8}}
      wrapperCol={{span: 14}}
    >
      <Form.Item label="组件id">
        <Input disabled value={curComponent.id} />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input disabled value={curComponent.name} />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input
          onChange={(e) => {
            updateComponent(Number(curComponentId), "desc", e.target.value);
          }}
          value={curComponent.desc}
        />
      </Form.Item>
      <Form.Item label="是否隐藏">
        <SettingFormItemSwitch
          value={curComponent.props.hidden}
          onChange={(value: any) => {
            updateComponent(Number(curComponentId), "hidden", value);
          }}
        />
      </Form.Item>
      {componentConfig[curComponent?.name]?.setter &&
        (!Array.isArray(componentConfig[curComponent?.name]?.setter) ? (
          React.createElement(
            componentConfig[curComponent?.name]?.setter as any
          )
        ) : (
          <CommonSetter
            setters={componentConfig[curComponent?.name].setter || []}
          />
        ))}
    </Form>
  );
};

export default ComponentAttr;
