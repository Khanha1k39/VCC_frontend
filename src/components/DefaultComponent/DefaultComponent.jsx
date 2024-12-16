import HeaderComponent from "../HeaderComponent/HeaderComponent";

function DefaultComponent({ children, Header }) {
  console.log(Header);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
          marginBottom: "30px",
        }}
      >
        <Header></Header>
      </div>
      <div style={{ marginTop: "80px" }}>{children}</div>
    </>
  );
}

export default DefaultComponent;
