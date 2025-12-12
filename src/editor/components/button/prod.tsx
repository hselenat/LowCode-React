import {Button as AntdButton} from "antd";
import {useImperativeHandle, forwardRef, useState} from "react";
import type {CommonComponentProps} from "../../interface";

const Button = (props: CommonComponentProps, ref: any) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        startLoading: () => {
          setLoading(true);
        },
        sendLoading: () => {
          setLoading(false);
        },
      };
    },
    []
  );

  return (
    <AntdButton loading={loading} {...props}>
      {props.text}
    </AntdButton>
  );
};

export default forwardRef(Button);
