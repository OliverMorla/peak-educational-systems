const Loading = () => {
  return (
    <div
      className="loading__wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",
        zIndex: 10,
        backgroundColor: "#364559",
      }}
    >
      <img src="/assets/loading/eclipse.svg" alt="" />
    </div>
  );
};

export default Loading;
