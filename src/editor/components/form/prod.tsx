import {Form as AntdForm, DatePicker, Input} from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import axios from "axios";
import type {CommonComponentProps} from "../../interface";
import dayjs from "dayjs";

// interface Props {
//   /** 组件的id */
//   id: number;
//   /** 提交表单的url接口地址 */
//   url?: string;
//   /** 子组件，表单项 */
//   children: any;
//   /** 搜索事件 */
//   onSearch?: (values: any) => void;
//   /** 保存成功事件 */
//   onSaveSuccess?: (values: any) => void;
//   /** 保存失败事件 */
//   onSaveFail?: (error: any) => void;
// }

const Form = (Props: CommonComponentProps, ref: any) => {
  const {defaultValue, children, onFinish, url} = Props;
  const [form] = AntdForm.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  useEffect(() => {
    if (defaultValue) {
      const data: any = {};
      React.Children.toArray(children).forEach((item: any) => {
        if (item.props.type === "date") {
          data[item.props.name] = dayjs(defaultValue[item.props.name]);
        } else {
          data[item.props.name] = defaultValue[item.props.name];
        }
      });

      form.setFieldsValue(data);
    }
  }, [defaultValue, children, form]);

  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        id: item.props.id,
        label: item.props.label,
        name: item.props.name,
        type: item.props.type,
      };
    });
  }, [children]);

  async function save(values: any) {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format("YYYY-MM-DD");
      }
    });
    if (url) {
      try {
        const response = await axios.post(url, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        onFinish(response.data);
      } catch (error) {
        console.error("API调用失败:", error);
        // 可以考虑添加错误处理事件
        onFinish(values);
      }
    } else {
      onFinish(values);
    }
  }

  return (
    <AntdForm
      name="form"
      labelCol={{span: 5}}
      wrapperCol={{span: 18}}
      form={form}
      onFinish={save}
    >
      {searchItems.map((item: any) => (
        <AntdForm.Item
          key={item.id}
          label={item.label}
          name={item.name}
          rules={
            item.rules === "required"
              ? [
                  {
                    required: true,
                    message: "不能为空",
                  },
                ]
              : []
          }
        >
          {item.type === "input" && <Input />}
          {item.type === "date" && <DatePicker />}
        </AntdForm.Item>
      ))}
    </AntdForm>
  );
};

export default forwardRef(Form);
