import { useContext } from "react";
import { dirItemContext } from "../../App";
import { formatSecond } from "../../utils/utils";

function SectionDirItem({ idx, title, readTime }) {
  const { dirItemIdx, setDirItemIdx } = useContext(dirItemContext);
  return (
    <div
      className="h-18 group relative mr-1 ml-2 flex cursor-pointer rounded-md py-2 pl-2 pr-4 text-left text-base hover:bg-sky-100 hover:shadow-inner"
      onClick={() => setDirItemIdx(idx)}
      // style={{
      //   backgroundColor: idx === dirItemIdx ? "#e0f2fe" : "",
      //   boxShadow:
      //     idx === dirItemIdx ? "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" : "unset",
      // }}
    >
      {idx === dirItemIdx ? (
        <span className="absolute top-2 -left-2 block h-7 w-1 rounded-r bg-sky-900 "></span>
      ) : null}
      {/* 章节号 */}
      <div
        style={{
          color: idx === dirItemIdx ? "#ea580c" : "#0c4a6e",
        }}
        className="pr-2 font-bold "
      >
        {idx}
      </div>
      {/* 章节标题 */}
      <div
        style={{
          color: idx === dirItemIdx ? "#ea580c" : "#0c4a6e",
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
