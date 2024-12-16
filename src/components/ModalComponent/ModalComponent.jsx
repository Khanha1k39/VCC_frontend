import { Modal } from "antd";

function ModalComponent({ title = "Modal", open = false, children, ...rest }) {
  console.log("open model", open);
  return (
    <Modal title={title} open={open} {...rest}>
      {children}
    </Modal>
  );
}

export default ModalComponent;
