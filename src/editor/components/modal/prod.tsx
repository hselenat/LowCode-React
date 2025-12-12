import {Modal as AntdModal} from "antd";
import {forwardRef, useImperativeHandle, useState} from "react";
import type {CommonComponentProps} from "../../interface";
const Modal = (
  {children, title, onOk, onCancel}: CommonComponentProps,
  ref: any
) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
        startConfirmLoading: () => {
          setConfirmLoading(true);
        },
        endConfirmLoading: () => {
          setConfirmLoading(false);
        },
      };
    },
    []
  );

  return (
    <AntdModal
      title={title}
      open={open}
      onCancel={() => {
        onCancel?.();
        setOpen(false);
      }}
      onOk={onOk?.()}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      {children}
    </AntdModal>
  );
};

export default forwardRef(Modal);
