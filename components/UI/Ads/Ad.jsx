const Ad = ({ sticky }) => {
  let elClass = "ad";
  if (sticky) elClass += " ad--sticky";

  return (
    <div className={elClass}>
      <div
        style={{
          width: "300px",
          height: "300px",
          background: "#D9D9D9",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>Advertisement</span>
      </div>
    </div>
  );
};

export default Ad;
