import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
} from "react";
import {Table as AntdTable, Divider, Space} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import type {CommonComponentProps} from "../../interface";

// interface Props {
//   /** 当前组件的id */
//   id: number;
//   /** 当前组件的子节点 */
//   children: any;
//   /** 当前组件的url */
//   url?: string;
// }

const Table = (props: CommonComponentProps, ref: any) => {
  const {children, url, _execEventFlow} = props;
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
          render: (value: any) =>
            value ? dayjs(value).format("YYYY-MM-DD") : null,
        };
      } else if (item?.props?.type === "option") {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (_: any, record: any) => {
            return (
              <Space size={0} split={<Divider type="vertical" />}>
                {item.props.options?.map((option: any) => {
                  return (
                    <a
                      className="select-none"
                      onClick={() => {
                        _execEventFlow(option?.event?.children, record, record);
                      }}
                      key={option.label}
                    >
                      {option.label}
                    </a>
                  );
                })}
              </Space>
            );
          },
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
