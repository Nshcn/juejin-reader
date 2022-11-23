import { createContext, useEffect, useState } from 'react'
import './index.css'
import SectionPage from './components/section-page/SectionPage'
import SectionDir from './components/section-dir/SectionDir'

export const dirItemContext = createContext({
  dirItemIdx: 0,
  setDirItemIdx: () => {},
})

function App() {
  const [raw, setRaw] = useState('')
  const [dir, setDir] = useState([])
  const [dirItemIdx, setDirItemIdx] = useState(0)
  const [bookTitle, setBookTitle] = useState('')
  const [toggleSideBar, setToggleSideBar] = useState(true)
  useEffect(() => {
    async function fetchData() {
      await fetch('http://127.0.0.1:4000/book')
        .then((res) => res.json())
        .then((res) => {
          setRaw(res)
          const { sections } = res
          const getDir = (sections) => {
            const dir = []
            sections.forEach((section) => {
              dir.push(section.title)
            })
            return dir
          }
          setDir(getDir(sections))
          setDirItemIdx(0)
          setBookTitle(res.title)
        })
    }
    fetchData()
  }, [])

  return (
    <>
      {/* header */}
      <div className="flex items-center place-content-between font-bold text-xl px-6 w-full h-16 border-b fixed bg-white z-10">
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-6 h-6 rounded-full bg-sky-300"
            onClick={() => setToggleSideBar((prev) => !prev)}
          ></div>
          <div>{bookTitle}</div>
        </div>
        <div className=" w-8 h-8 rounded-full border bg-sky-500"></div>
      </div>
      <div className="flex bg-[#e4e5e5] pt-16">
        {toggleSideBar ? (
          <div>
            <dirItemContext.Provider
              value={{
                dirItemIdx,
                setDirItemIdx,
              }}
            >
              <SectionDir dir={dir} activeDirItemIdx={dirItemIdx} />
            </dirItemContext.Provider>
            <div className="max-[1000px]:hidden w-80 h-screen bg-red-200"></div>
          </div>
        ) : null}
        <SectionPage
          content={raw == '' ? '' : raw.sections[dirItemIdx].content}
        />
      </div>
    </>
  )
}

export default App
