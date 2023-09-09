/* eslint-disable @next/next/no-img-element */
const Loading: React.FunctionComponent = (): JSX.Element => {
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
      <img src="/assets/loading/eclipse.svg" alt="loading-gif" />
    </div>
  );
};

export default Loading;
