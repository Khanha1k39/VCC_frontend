import HeaderComponent from "../HeaderComponent/HeaderComponent";

function DefaultComponent({ children }) {
  return (
    <>
      <HeaderComponent></HeaderComponent> {children}
    </>
  );
}

export default DefaultComponent;
