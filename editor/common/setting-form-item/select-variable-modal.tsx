/* eslint-disable @typescript-eslint/no-explicit-any */
import {Modal, Table} from "antd";
import {useVariableStore} from "../../store/variable";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (record: any) => void;
}

const columns = [
  {
    title: "变量名",
    dataIndex: "name",
  },
  {
    title: "变量值",
    dataIndex: "value",
  },
  {
    title: "备注",
    dataIndex: "remark",
  },
];

const SelectVariableModal: React.FC<Props> = ({open, onCancel, onSelect}) => {
  const {variables} = useVariableStore();
  function rowSelect(record: any) {
    onSelect(record);
  }

  return (
    <Modal open={open} onCancel={onCancel} title="选择变量" width={800}>
      <Table
        onRow={(record) => ({
          onClick: () => rowSelect(record),
        })}
        columns={columns}
        dataSource={variables}
        rowKey={(record) => record.name}
      />
    </Modal>
  );
};
export default SelectVariableModal;
