import {Button, Col, Form, Input, Row, Space} from "antd";
import React, {useMemo} from "react";
import {useDrop} from "../../hooks/use-drop";
import type {CommonComponentProps} from "../../interface";

const SearchForm: React.FC<CommonComponentProps> = (
  props: CommonComponentProps
) => {
  const {_id, _name, children, onSearch} = props;
  const [form] = Form.useForm();

  const {canDrop, dropRef} = useDrop(_id, _name);

  const searchItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      console.log("searchItems", item);
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?._id,
      };
    });
  }, [children]);

  const search = (values: any) => {
    onSearch?.(values);
  };

  if (!children?.length) {
    return (
      <div
        data-component-id={_id}
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
        className="p-[16px] flex justify-center"
        style={{border: canDrop ? "1px solid #ccc" : "none"}}
      >
        暂无内容
      </div>
    );
  }

  return (
    <div
      className="w-[100%]"
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      data-component-id={_id}
      style={{border: canDrop ? "1px solid #ccc" : "none"}}
    >
      <Form form={form} onFinish={search}>
        <Row gutter={20}>
          {searchItems.map((item: any) => {
            return (
              <Col span={6} key={item.name}>
                <Form.Item
                  data-component-id={item.id}
                  name={item.name}
                  label={item.label}
                >
                  <Input />
                </Form.Item>
              </Col>
            );
          })}
          <Col span={6}>
            <Space>
              <Button
                onClick={() => {
                  form.submit();
                }}
                type="primary"
              >
                搜索
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  form.submit();
                }}
              >
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
