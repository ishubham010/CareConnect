export function Home() {
  return (
    <div>
      <div style={{ position: "relative", minHeight:'85vh' }}>
        <img
          src="./img/home.png"
          alt="HomePage"
          style={{width:'100vh', height:'70vh', marginLeft:'45%'}}
        />
        <h1
          style={{
            position: "absolute",
            top: "45%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "6rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          CareConnect
        </h1>
        <h5 style={{
            position: "absolute",
            top: "58%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            fontStyle:'italic',
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}>A home away from home</h5>
      </div>
    </div>
  );
}
