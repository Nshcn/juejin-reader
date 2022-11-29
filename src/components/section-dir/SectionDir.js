import SectionDirItem from "../section-dir-item/SectionDirItem";
import { dirItemContext } from "../../App";
import { useContext } from "react";

function SectionDir({ dir }) {
  const { showSideBar } = useContext(dirItemContext);
  return (
    <div
      className={`${
        showSideBar ? "ml-0" : "-ml-[320px]"
      } fixed z-20 w-[320px] shadow-xl`}
    >
      <div className="scrollbar-thin fixed h-[calc(100vh_-_64px)] w-80 flex-auto overflow-y-scroll bg-white py-1 shadow-md">
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
