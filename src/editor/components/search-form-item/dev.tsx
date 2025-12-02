import {Input as AntdInput} from "antd";

const SearchFormItem = (props: any) => {
  return (
    <AntdInput
      data-component-id={props.id}
      type={props.type}
      value={props.value}
    />
  );
};

export default SearchFormItem;
