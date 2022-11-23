import { useEffect, useState } from 'react'

function SectionPage({ content }) {
  const [raw, setRaw] = useState('')
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
    <div className="m-auto max-[1150px]:min-w-[600px]">
      {raw == '' ? null : (
        <div
          className="section-page mt-8 book-section-view p-20"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
      {/* <div className="  h-5 bg-sky-500 flex place-content-between">
        <div className=" rounded-full w-12 h-12 bg-[#017fff] -ml-20"></div>
        <div className=" rounded-full w-12 h-12 bg-[#017fff] -mr-20"></div>
      </div> */}
      <div className="fixed top-[40%] w-12 h-12 bg-gray-400 rounded-full"></div>
      <div className="fixed bottom-[40%] w-12 h-12 bg-gray-400 rounded-full"></div>
    </div>
  )
}

export default SectionPage
