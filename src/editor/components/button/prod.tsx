import {Button as AntdButton} from "antd";
import {useImperativeHandle, forwardRef, useState} from "react";

const Button = (props: any, ref: any) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      startLoading: () => {
        setLoading(true);
      },
      sendLoading: () => {
        setLoading(false);
      },
    };
  });

  return (
    <AntdButton loading={loading} {...props}>
      {props.text}
    </AntdButton>
  );
};

export default forwardRef(Button);
