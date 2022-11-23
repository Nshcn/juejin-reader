import SectionDirItem from '../section-dir-item/SectionDirItem'
import { dirItemContext } from '../../App'
import { useContext } from 'react'

function SectionDir({ dir }) {
  const { showSideBar } = useContext(dirItemContext)
  return (
    <div
      className="fixed w-[320px]"
      style={{
        marginLeft: showSideBar ? '0' : '-320px',
      }}
    >
      <div className="flex-auto w-80 h-screen bg-[#f7f8fa] fixed">
        {dir.map((title, idx) => {
          return <SectionDirItem title={title} idx={idx} key={title} />
        })}
      </div>
    </div>
  )
}
export default SectionDir
