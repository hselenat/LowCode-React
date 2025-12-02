import {Modal as AntdModal} from "antd";

const Modal = (props: any) => {
  return (
    <AntdModal
      data-component-id={props.id}
      title="Basic Modal"
      closable={{"aria-label": "Custom Close Button"}}
    >
      {props.children}
    </AntdModal>
  );
};

export default Modal;
