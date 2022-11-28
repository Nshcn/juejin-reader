export default function Avatar() {
  return (
    <div
      className="h-8 w-8 rounded-full border-2 border-zinc-200 shadow-inner"
      style={{
        background: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      }}
    >
      <img
        className="rounded-full"
        alt="头像"
        src={require("../../assets/avatar.png")}
      ></img>
    </div>
  );
}
