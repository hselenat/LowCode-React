import {Input as AntdInput} from "antd";

const SearchFormItem = (props: any) => {
  return <AntdInput type={props.type} value={props.value} />;
};

export default SearchFormItem;
