import {Modal, Tree} from "antd";
import {useComponentsStore} from "../../store/components";

interface ComponentTreeProps {
  open?: boolean;
  onCancel?: () => void;
}

const ComponentTree = ({open, onCancel}: ComponentTreeProps) => {
  const {components, setCurComponentId} = useComponentsStore();
  // 选择组件后，高亮当前选择的的组件，并关闭弹窗
  function componentSelect([selectedKey]: any[]) {
    setCurComponentId(selectedKey);
    onCancel?.();
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="组件大纲"
      width={400}
      destroyOnHidden={true}
      footer={null}
    >
      <Tree
        showLine
        fieldNames={{title: "name", key: "id"}}
        treeData={components as any}
        defaultExpandAll={true}
        onSelect={componentSelect}
      />
    </Modal>
  );
};

export default ComponentTree;
