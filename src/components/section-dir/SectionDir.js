import SectionDirItem from '../section-dir-item/SectionDirItem'

function SectionDir({ dir, activeDirItemIdx }) {
  return (
    <div className="max-[1000px]:hidden">
      <div className="flex-auto w-80 h-screen bg-[#f7f8fa] fixed">
        {dir.map((title, idx) => {
          return <SectionDirItem title={title} idx={idx} key={title} />
        })}
      </div>
    </div>
  )
}
export default SectionDir
