import { useContext } from "react";
import { dirItemContext } from "../../App";
import SectionComments from "../section-comments/SectionComments";

function SectionPage({ content, comments, setDirItemIdx }) {
  const { dirItemIdx, showSideBar, dirItemLength } = useContext(dirItemContext);

  return (
    <div
      style={{
        marginLeft: showSideBar ? "320px" : "0",
      }}
      className="ml-[320px] w-full"
    >
      {content === "" ? null : (
        <div className=" book-section-view mx-auto mt-12 min-w-[600px] max-w-[800px] bg-white p-20 shadow-xl">
          {/* 内容区 */}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          {/* 评论区 */}
          <SectionComments comments={comments} />
        </div>
      )}
      {/* 章节跳转按钮 */}
      <div
        style={{
          marginLeft: showSideBar ? "160px" : "unset",
        }}
        className="fixed left-[50%] top-[50%] flex w-full max-w-[980px] -translate-x-1/2 place-content-between px-8"
      >
        <div
          style={{ visibility: dirItemIdx === 0 ? "hidden" : "visible" }}
          onClick={() => setDirItemIdx((prev) => prev - 1)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#017fff] shadow-2xl"
        >
          <div className="ml-1 h-3 w-3 rotate-45 border-2 border-transparent border-l-white border-b-white"></div>
        </div>
        <div
          style={{
            visibility: dirItemIdx === dirItemLength - 1 ? "hidden" : "visible",
          }}
          onClick={() => setDirItemIdx((prev) => prev + 1)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#017fff] shadow-2xl"
        >
          <div className="-ml-1 h-3 w-3 -rotate-[135deg] border-2 border-transparent border-l-white border-b-white"></div>
        </div>
      </div>
    </div>
  );
}

export default SectionPage;
