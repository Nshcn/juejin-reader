import { useContext, useRef } from "react";
import { dirItemContext } from "../../App";
import SectionComments from "../section-comments/SectionComments";

function SectionPage({ content, comments, setDirItemIdx }) {
  const { dirItemIdx, showSideBar, dirItemLength } = useContext(dirItemContext);
  const pageRef = useRef(null);
  const backToTop = () => {
    pageRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${
        showSideBar ? "lg:ml-[320px]" : "ml-0"
      } scrollbar-thin lg:scrollbar-thick relative h-[calc(100vh_-_64px)] w-full overflow-scroll`}
      ref={pageRef}
    >
      {content === "" ? null : (
        <div className=" book-section-view m-1 max-w-[800px] rounded-xl bg-white px-4 shadow-md sm:min-w-min lg:mx-auto lg:mt-12 lg:min-w-[600px] lg:px-20 lg:pt-8">
          {/* 内容区 */}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          {/* 评论区 */}
          <SectionComments comments={comments} />
        </div>
      )}
      {/* 章节跳转按钮 */}
      <div className="fixed top-[40%] left-[50%] ml-[560px] flex-col place-content-between">
        <div
          onClick={() => setDirItemIdx((prev) => prev - 1)}
          className={`${
            dirItemIdx === 0 ? "invisible" : "visible"
          } m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-sky-100 shadow-xl hover:bg-sky-200`}
        >
          <div className="border-b-sky ml-1 h-3 w-3 rotate-45 border-2 border-transparent border-l-sky-900 border-b-sky-900"></div>
        </div>
        <div
          onClick={() => setDirItemIdx((prev) => prev + 1)}
          className={`${
            dirItemIdx === dirItemLength - 1 ? "invisible" : "visible"
          } m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-sky-100 shadow-xl hover:bg-sky-200`}
        >
          <div className="border-b-sky -ml-1 h-3 w-3 -rotate-[135deg] border-2 border-transparent border-l-sky-900 border-b-sky-900"></div>
        </div>
        <div
          onClick={() => backToTop()}
          className="relative m-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-orange-200 shadow-xl hover:bg-orange-300"
        >
          <div className="border-b-sky absolute top-6 h-3 w-3 -rotate-[225deg] border-2 border-transparent border-l-sky-900 border-b-sky-900"></div>
          <div className="absolute top-4 h-[2px] w-4 bg-sky-900"></div>
        </div>
      </div>
    </div>
  );
}

export default SectionPage;
