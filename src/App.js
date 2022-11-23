import { createContext, useEffect, useState } from 'react'
import './index.css'
import SectionPage from './components/section-page/SectionPage'
import SectionDir from './components/section-dir/SectionDir'

export const dirItemContext = createContext({
  showSideBar: true,
  setShowSideBar: () => {},
  dirItemIdx: 0,
  dirItemLength: 0,
  setDirItemIdx: () => {},
})

function App() {
  const [raw, setRaw] = useState('')
  const [dir, setDir] = useState([])
  const [dirItemIdx, setDirItemIdx] = useState(0)
  const [showSideBar, setShowSideBar] = useState(true)
  const [bookTitle, setBookTitle] = useState('')
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

  const resizeUpdate = (e) => {
    let w = e.target.innerWidth
    setShowSideBar(w > 1000 ? true : false)
  }
  useEffect(() => {
    let w = window.innerWidth
    setShowSideBar(w > 1000 ? true : false)
    window.addEventListener('resize', resizeUpdate)
    return () => {
      window.removeEventListener('resize', resizeUpdate)
    }
  }, [])

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
      <div className="flex items-center place-content-between font-bold text-xl px-6 w-full h-16 border-b fixed bg-white z-10">
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-6 h-6 rounded-full bg-sky-300"
            onClick={() => setShowSideBar((prev) => !prev)}
          ></div>
          <div>{bookTitle}</div>
        </div>
        <div className=" w-8 h-8 rounded-full border bg-sky-500"></div>
      </div>
      <div className="flex bg-[#e4e5e5] pt-16">
        <SectionDir dir={dir} />
        <SectionPage
          setDirItemIdx={setDirItemIdx}
          content={raw == '' ? '' : raw.sections[dirItemIdx].content}
        />
      </div>
    </dirItemContext.Provider>
  )
}

export default App
