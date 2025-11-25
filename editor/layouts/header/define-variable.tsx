import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {Button, Form, Input, Modal, Select, Space} from "antd";
import {useVariableStore, type Variable} from "../../store/variable";
import {useEffect} from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
}

const DefineVariable: React.FC<Props> = ({open, onCancel}) => {
  const [form] = Form.useForm();

  const {setVariables, variables} = useVariableStore();

  function onFinish(values: {variables: Variable[]}) {
    setVariables(values.variables);
    onCancel();
  }

  useEffect(() => {
    if (open) {
      form.setFieldsValue({variables});
    }
  }, [open, variables, form]);

  return (
    <Modal
      title="定义变量"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      width={700}
    >
      <Form<{variables: Variable[]}>
        form={form}
        onFinish={onFinish}
        initialValues={{variables}}
        autoComplete="off"
      >
        <Form.List name="variables">
          {(fields, {add, remove}) => (
            <>
              {fields.map(({key, name, ...restField}) => (
                <Space
                  key={key}
                  style={{display: "flex", marginBottom: 8}}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{required: true, message: "请输入变量名"}]}
                  >
                    <Input placeholder="变量名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    rules={[{required: true, message: "请选择变量类型"}]}
                  >
                    <Select
                      style={{width: 140}}
                      options={[
                        {label: "字符串", value: "string"},
                        {label: "数字", value: "number"},
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "defaultValue"]}
                    rules={[{required: true, message: "请输入变量值"}]}
                  >
                    <Input placeholder="默认值" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "remark"]}>
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(key)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加变量
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default DefineVariable;
