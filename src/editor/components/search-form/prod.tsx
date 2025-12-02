import {Input as AntdInput} from "antd";

const SearchForm = (props: any) => {
  return <AntdInput type="search" value={props.value} />;
};

export default SearchForm;
