import { useContext } from 'react'
import { dirItemContext } from '../../App'
import { formatSecond } from '../../utils/utils'

function SectionDirItem({ idx, title, readTime }) {
  const { dirItemIdx, setDirItemIdx } = useContext(dirItemContext)
  return (
    <div
      className="cursor-pointer relative group flex h-18 w-full p-2 px-6 text-black text-base hover:bg-[#f1f1f3] text-left"
      onClick={() => setDirItemIdx(idx)}
    >
      {idx == dirItemIdx ? (
        <span className="absolute block w-1 h-5 top-3 left-0 bg-[#1e80ff] rounded-r "></span>
      ) : null}
      {/* 章节号 */}
      <div
        style={{
          color: idx == dirItemIdx ? '#1e80ff' : '#89919f',
        }}
        className="pr-2 font-bold "
      >
        {idx}
      </div>
      {/* 章节标题 */}
      <div
        style={{
          color: idx == dirItemIdx ? '#1e80ff' : 'black',
        }}
      >
        {title}
        <div className="text-sm text-gray-400 mt-1">
          学习时长：{formatSecond(readTime)}
        </div>
      </div>
    </div>
  )
}
export default SectionDirItem
