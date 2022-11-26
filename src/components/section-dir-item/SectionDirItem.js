import { useContext } from "react";
import { dirItemContext } from "../../App";
import { formatSecond } from "../../utils/utils";

function SectionDirItem({ idx, title, readTime }) {
  const { dirItemIdx, setDirItemIdx } = useContext(dirItemContext);
  return (
    <div
      className="h-18 group relative flex w-full cursor-pointer p-2 px-6 text-left text-base text-black hover:bg-[#f1f1f3]"
      onClick={() => setDirItemIdx(idx)}
    >
      {idx === dirItemIdx ? (
        <span className="absolute top-3 left-0 block h-5 w-1 rounded-r bg-[#1e80ff] "></span>
      ) : null}
      {/* 章节号 */}
      <div
        style={{
          color: idx === dirItemIdx ? "#1e80ff" : "#89919f",
        }}
        className="pr-2 font-bold "
      >
        {idx}
      </div>
      {/* 章节标题 */}
      <div
        style={{
          color: idx === dirItemIdx ? "#1e80ff" : "black",
        }}
      >
        {title}
        <div className="mt-1 text-sm text-gray-400">
          学习时长：{formatSecond(readTime)}
        </div>
      </div>
    </div>
  );
}
export default SectionDirItem;
