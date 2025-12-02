import {Modal as AntdModal} from "antd";

const Modal = (props: any) => {
  return (
    <AntdModal
      title="Basic Modal"
      closable={{"aria-label": "Custom Close Button"}}
    >
      {props.children}
    </AntdModal>
  );
};

export default Modal;
