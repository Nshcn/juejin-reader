import { createContext, useEffect, useState, useRef, forwardRef } from "react";
import "./index.css";
import SectionPage from "./components/section-page/SectionPage";
import SectionDir from "./components/section-dir/SectionDir";
import { server } from "./utils/config";

export const dirItemContext = createContext({
  showSideBar: true,
  setShowSideBar: () => {},
  dirItemIdx: 0,
  dirItemLength: 0,
  setDirItemIdx: () => {},
});

function App() {
  const [raw, setRaw] = useState("");
  const [dir, setDir] = useState([]);
  const [dirItemIdx, setDirItemIdx] = useState(0);
  const [showSideBar, setShowSideBar] = useState(true);
  const [bookTitle, setBookTitle] = useState("");
  const [bookShelf, setBookShelf] = useState([]);
  const [bookletIdx, setBookletIdx] = useState(0);

  // 首次加载获取之前的进度进度
  useEffect(() => {
    let storage = window.localStorage;
    let bookIdx = storage.getItem("bookIdx");
    let dirIdx = storage.getItem("dirIdx");
    setBookletIdx(bookIdx ? Number(bookIdx) : 0);
    setDirItemIdx(dirIdx ? Number(dirIdx) : 0);
  }, []);
  // 保存当前阅读进度
  useEffect(() => {
    let storage = window.localStorage;
    storage.setItem("bookIdx", bookletIdx);
    storage.setItem("dirIdx", dirItemIdx);
  }, [bookletIdx, dirItemIdx]);

  // 获取书架信息
  useEffect(() => {
    async function fetchBookShelf() {
      await fetch(`http://${server}:4000/bookshelf`)
        .then((res) => res.json())
        .then((res) => {
          setBookShelf(res);
        });
    }
    fetchBookShelf();
  }, []);

  // 获取具体一本小册
  useEffect(() => {
    async function fetchBooklet() {
      await fetch(
        `http://${server}:4000/book/${bookShelf[bookletIdx].booklet_id}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRaw(res);
          const { sections } = res;
          const getDir = (sections) => {
            const dir = [];
            sections.forEach((section) => {
              dir.push({
                title: section.title,
                read_time: section.read_time,
              });
            });
            return dir;
          };
          setDir(getDir(sections));
          setBookTitle(res.title);
        });
    }
    if (bookShelf.length > 0) {
      fetchBooklet();
    }
  }, [bookShelf, bookletIdx]);

  const resizeUpdate = (e) => {
    let w = e.target.innerWidth;
    setShowSideBar(w > 1000 ? true : false);
  };
  useEffect(() => {
    let w = window.innerWidth;
    setShowSideBar(w > 1000 ? true : false);
    window.addEventListener("resize", resizeUpdate);
    return () => {
      window.removeEventListener("resize", resizeUpdate);
    };
  }, []);

  const [showBookShelf, setShowBookShelf] = useState(false);

  const bookShelfRef = useRef(null);
  const bookShelfButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        bookShelfRef.current &&
        !bookShelfRef.current.contains(event.target) &&
        !bookShelfButtonRef.current.contains(event.target)
      ) {
        setShowBookShelf(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bookShelfRef]);

  const BookShelf = forwardRef(({ bookShelf }, ref) => {
    return (
      <div
        ref={ref}
        className="scrollbar-thin fixed right-[16px] top-[80px] max-h-[450px] w-[270px] overflow-y-scroll rounded-md bg-white py-2 pl-2 pr-1 font-normal shadow-xl"
      >
        {bookShelf.map((book, idx) => {
          return (
            <div
              className="cursor-pointer truncate rounded-md py-1 px-2 text-sm text-sky-900   hover:bg-slate-100 hover:text-orange-600"
              title={book.title}
              key={book.title}
              onClick={() => {
                setBookletIdx(idx);
                setDirItemIdx(0);
              }}
            >
              {book.title}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <dirItemContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        dirItemIdx,
        dirItemLength: dir.length,
        setDirItemIdx,
      }}
    >
      {/* header */}
      <div className="fixed z-10 flex h-16 w-full place-content-between items-center border-b bg-white px-6 text-xl font-bold shadow-md">
        <div className="flex cursor-pointer items-center gap-2">
          <div
            className="h-6 w-6"
            onClick={() => setShowSideBar((prev) => !prev)}
          >
            <img
              className={`${showSideBar ? "rotate-0" : "rotate-180"}`}
              alt=""
              src={require("./assets/fold.png")}
            ></img>
          </div>
          <div className="text-sky-900">{bookTitle}</div>
        </div>
        {/* 课程选择 */}
        <div
          ref={bookShelfButtonRef}
          onClick={() => setShowBookShelf((prev) => !prev)}
          className={`${
            showBookShelf ? "bg-orange-200" : "bg-sky-100"
          } flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-sky-100 shadow-sm hover:bg-orange-200 hover:shadow-inner`}
        >
          <img
            className="h-8 w-8"
            src={require("./assets/book.png")}
            alt="书架"
          ></img>
        </div>
        {showBookShelf ? (
          <BookShelf ref={bookShelfRef} bookShelf={bookShelf} />
        ) : null}
      </div>
      {/* 内容区 */}
      <div className="flex bg-gray-200 pt-16">
        <SectionDir dir={dir} />
        <SectionPage
          setDirItemIdx={setDirItemIdx}
          content={raw === "" ? "" : raw.sections[dirItemIdx].content}
          comments={raw === "" ? "" : raw.comments[dirItemIdx].comment}
        />
      </div>
    </dirItemContext.Provider>
  );
}

export default App;
