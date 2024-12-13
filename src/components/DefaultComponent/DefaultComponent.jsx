import HeaderComponent from "../HeaderComponent/HeaderComponent";

function DefaultComponent({ children }) {
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
        <HeaderComponent></HeaderComponent>{" "}
      </div>
      <div style={{ marginTop: "80px" }}>{children}</div>
    </>
  );
}

export default DefaultComponent;
