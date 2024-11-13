import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
const List = ({setOption, setActive, languages}) => {
  let items = languages.map((item) => item.title)
  const [search, setSearch] = useState('')
  const handleClick = (e) => {
    setOption(e.target.value)
    setActive(false)
  }
  const handleChange = (e) => {
    items = items.filter(language => language.toLowerCase().includes(e.target.value.toLowerCase()))
  }
  return (
    <div className="absolute z-10 min-w-[200px] max-h-[200px] bg-white shadow-xl border-gray-400 border-2 rounded-2xl overflow-hidden">
      <input className="w-full" id="btn" type="search" onChange={handleChange}/>
      <OverlayScrollbarsComponent
        options={{scrollbars: {theme: 'os-theme-dark'}}}
      >
        <div className="flex flex-col max-h-[190px]">
          {items.map((item, i) => (
            <button
            id="btn"
            key={i} 
            className={`${items.length - 1 === i ? 'border-b-0' : 'border-b-2'} hover:bg-blue-500 hover:text-slate-50 px-2 py-1`} 
            value={item}
            onClick={handleClick}
            >
              {item}
            </button>
          ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}

export default List