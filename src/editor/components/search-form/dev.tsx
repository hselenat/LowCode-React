import {Input as AntdInput} from "antd";

const SearchForm = (props: any) => {
  return (
    <AntdInput data-component-id={props.id} type="search" value={props.value} />
  );
};

export default SearchForm;
