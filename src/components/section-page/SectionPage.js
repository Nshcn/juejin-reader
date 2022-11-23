import { useContext, useEffect, useState } from 'react'
import { dirItemContext } from '../../App'

function SectionPage({ content, setDirItemIdx }) {
  const [raw, setRaw] = useState('')
  const { dirItemIdx, showSideBar, dirItemLength } = useContext(dirItemContext)

  useEffect(() => {
    async function fetchData() {
      await fetch('http://127.0.0.1:4000/book')
        .then((res) => res.json())
        .then((res) => {
          setRaw(res)
        })
    }
    fetchData()
  }, [])

  return (
    <div
      style={{
        marginLeft: showSideBar ? '320px' : '0',
      }}
      className="w-full ml-[320px]"
    >
      {raw == '' ? null : (
        <div className=" shadow-xl max-w-[800px] min-w-[600px] bg-white mx-auto mt-12 book-section-view p-20">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      )}
      {/* 章节跳转按钮 */}
      <div
        style={{
          marginLeft: showSideBar ? '160px' : 'unset',
        }}
        className="fixed left-[50%] -translate-x-1/2  max-w-[980px] w-full bottom-20 flex place-content-between"
      >
        <div
          style={{ visibility: dirItemIdx == 0 ? 'hidden' : 'visible' }}
          onClick={() => setDirItemIdx((prev) => prev - 1)}
          className="cursor-pointer rounded-full w-12 h-12 bg-[#017fff] shadow-2xl flex justify-center items-center"
        >
          <div className="border-transparent border-l-white border-b-white w-3 h-3 ml-1 rotate-45 border-2"></div>
        </div>
        <div
          style={{
            visibility: dirItemIdx == dirItemLength - 1 ? 'hidden' : 'visible',
          }}
          onClick={() => setDirItemIdx((prev) => prev + 1)}
          className="cursor-pointer rounded-full w-12 h-12 bg-[#017fff] shadow-2xl flex justify-center items-center"
        >
          <div className="border-transparent border-l-white border-b-white w-3 h-3 -ml-1 -rotate-[135deg] border-2"></div>
        </div>
      </div>
    </div>
  )
}

export default SectionPage
