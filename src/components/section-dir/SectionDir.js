import SectionDirItem from "../section-dir-item/SectionDirItem";
import { dirItemContext } from "../../App";
import { useContext } from "react";

function SectionDir({ dir }) {
  const { showSideBar } = useContext(dirItemContext);
  return (
    <div
      className="fixed z-20 w-[320px] shadow-xl"
      style={{
        marginLeft: showSideBar ? "0" : "-320px",
      }}
    >
      <div className="scrollbar fixed h-[calc(100vh_-_64px)] w-80 flex-auto overflow-y-scroll bg-[#f7f8fa]">
        {dir.map(({ title, read_time }, idx) => {
          return (
            <SectionDirItem
              title={title}
              readTime={read_time}
              idx={idx}
              key={title}
            />
          );
        })}
      </div>
    </div>
  );
}
export default SectionDir;
