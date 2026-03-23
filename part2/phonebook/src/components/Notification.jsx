const Notification = ({ text, isError }) => {
  console.log(text);
  if (text === null) return null;

  /** @type {import('react').CSSProperties} */
  const style = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={style}>{text}</div>;
};

export default Notification;
