export default function Avatar() {
  return (
    <div
      className="h-8 w-8 rounded-full"
      style={{
        background: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      }}
    >
      <img
        className="rounded-full"
        src={require("../../assets/avatar.png")}
      ></img>
    </div>
  );
}
