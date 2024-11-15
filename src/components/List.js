import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
const List = ({setOption, setActive, languages, active}) => {
  const items = languages.map((item) => item.title)
  const [language, setLanguage] = useState(items)
  const inputField = useRef()
  const inputFieldReset = () => {
    if (inputField.current.value !== ''){
      inputField.current.value = ''
      setLanguage(items)
    }
  }
  const handleClick = (e) => {
    setOption(e.target.value)
    setActive(false)
    inputFieldReset()
  }
  const handleChange = (e) => {
    setLanguage(items.filter(lan => lan.toLowerCase().includes(e.target.value.toLowerCase())))
  }
  const handleClickAway = (e) => {
    if(!e.target.matches('#btn')){
      setActive(false)
      inputFieldReset()
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleClickAway)
    return () => {
      window.removeEventListener('click', handleClickAway)
    }
  }, [active])
  return (
    <div className="absolute z-10 w-[200px] min-h-[200px] bg-white shadow-xl border-gray-400 border-2 rounded-2xl overflow-hidden">
      <input className="w-full outline-none px-2 py-1 border-b-slate-400 border-b-[2px]"
        id="btn" 
        type="text" 
        onChange={handleChange}
        autoComplete='off'
        ref={inputField}
      />
      <OverlayScrollbarsComponent
        options={{scrollbars: {theme: 'os-theme-dark'}}}
      >
        <div className="flex flex-col max-h-[190px]">
          {language.map((item, i) => (
            <button
            id="btn"
            key={i} 
            className={`${language.length - 1 === i ? 'border-b-0' : 'border-b-2'} hover:bg-blue-500 hover:text-slate-50 px-2 py-1`} 
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