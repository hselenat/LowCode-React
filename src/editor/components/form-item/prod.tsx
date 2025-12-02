import {Input as AntdInput} from "antd";

const FormItem = (props: any) => {
  return <AntdInput type="search" value={props.value} />;
};

export default FormItem;
