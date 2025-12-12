import {Button as AntdButton} from "antd";
import type {CommonComponentProps} from "../../interface";

const Button = (props: CommonComponentProps) => {
  const {_id, text, type} = props;
  return (
    <AntdButton data-component-id={_id} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;
