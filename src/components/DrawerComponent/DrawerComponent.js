import { Drawer } from "antd";

function DrawerComponent({
  title = "Drawer",
  placement = "right",
  isOpen = false,
  onClose,
  children,
  ...rests
}) {
  return (
    <Drawer
      forceRender
      onClose={onClose}
      open={isOpen}
      title={title}
      //   getContainer={false}
      placement={placement}
      {...rests}
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
