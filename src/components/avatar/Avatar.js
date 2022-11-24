export default function Avatar() {
  return (
    <div
      className="w-8 h-8 rounded-full"
      style={{
        background: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
      }}
    >
      <img
        className="rounded-full"
        src={require('../../assets/avatar.png')}
      ></img>
    </div>
  )
}
