import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
} from "react";
import {Table as AntdTable} from "antd";
import axios from "axios";
import dayjs from "dayjs";

interface Props {
  /** 当前组件的id */
  id: number;
  /** 当前组件的子节点 */
  children: any;
  /** 当前组件的url */
  url?: string;
}

const Table = (props: Props, ref: any) => {
  const {children, url} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<any>({});
  const getData = async (params?: any) => {
    if (url) {
      setLoading(true);
      const res = await axios.get(url, {
        params,
      });
      setLoading(false);
      setData(res.data);
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        search: setSearchParams,
        reload: () => {
          getData(searchParams);
        },
      };
    },
    [searchParams]
  );

  useEffect(() => {
    getData(searchParams);
  }, [searchParams]);

  const columns: any = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item.props?.type === "date") {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          key: item.props?.dataIndex,
          render: (value: any) => dayjs(value).format("YYYY-MM-DD"),
        };
      }
      return {
        title: item.props?.title,
        dataIndex: item.props?.dataIndex,
        key: item.props?.dataIndex,
      };
    });
  }, [children]);

  return (
    <AntdTable
      dataSource={data}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  );
};

export default forwardRef(Table);
