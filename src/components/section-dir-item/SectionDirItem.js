import { useContext } from "react";
import { dirItemContext } from "../../App";
import { formatSecond } from "../../utils/utils";

function SectionDirItem({ idx, title, readTime }) {
  const { dirItemIdx, setDirItemIdx } = useContext(dirItemContext);
  return (
    <div
      className="h-18 group relative mr-1 ml-2 flex cursor-pointer rounded-md py-2 pl-2 pr-4 text-left text-base hover:bg-sky-100 hover:shadow-inner"
      onClick={() => {
        setDirItemIdx(idx);
      }}
    >
      {idx === dirItemIdx ? (
        <span className="absolute top-2 -left-2 block h-7 w-1 rounded-r bg-sky-900 "></span>
      ) : null}
      {/* 章节号 */}
      <div
        className={`pr-2 font-bold ${
          idx === dirItemIdx ? "text-orange-600" : "text-sky-900"
        }`}
      >
        {idx}
      </div>
      {/* 章节标题 */}
      <div
        className={`${idx === dirItemIdx ? "text-orange-600" : "text-sky-900"}`}
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
