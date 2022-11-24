import SectionDirItem from '../section-dir-item/SectionDirItem'
import { dirItemContext } from '../../App'
import { useContext } from 'react'

function SectionDir({ dir }) {
  const { showSideBar } = useContext(dirItemContext)
  return (
    <div
      className="fixed w-[320px] z-20 shadow-xl"
      style={{
        marginLeft: showSideBar ? '0' : '-320px',
      }}
    >
      <div className=" overflow-scroll flex-auto w-80 h-[calc(100vh_-_64px)] bg-[#f7f8fa] fixed">
        {dir.map(({ title, read_time }, idx) => {
          return (
            <SectionDirItem
              title={title}
              readTime={read_time}
              idx={idx}
              key={title}
            />
          )
        })}
      </div>
    </div>
  )
}
export default SectionDir
