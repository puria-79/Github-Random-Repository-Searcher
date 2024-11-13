import { useEffect, useState } from "react"
import List from "./List"
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({option, setOption, languages}) => {
  const [active, setActive] = useState(false)
  const handleClick = () => {
    active ? setActive(false) : setActive(true)
  }
  const handleClickAway = (e) => {
    if(!e.target.matches('#btn')){
      setActive(false)
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleClickAway)
    return () => {
      window.removeEventListener('click', handleClickAway)
    }
  }, [active])
  return (
    <div className="flex flex-col py-2">
      <button id="btn" className="min-w-[200px] items-center flex gap-4 justify-between py-1 px-4 transition-[border] border-gray-400 hover:border-gray-800 rounded-full border-2"
        onClick={handleClick}
      >
        <span id="btn">{option}</span>
        <span id="btn"><GoChevronDown/></span>
      </button>
      <div id="btn" className={`${active ? `opacity-100` : `opacity-0 invisible`}`}>
        <List setOption={setOption} setActive={setActive} languages={languages}/>
      </div>
    </div>
  )
}

export default Dropdown