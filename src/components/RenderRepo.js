import { GoStarFill } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import { GoRepoForked } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
const RenderRepo = ({apiData}) => {
  return (
    <div className="aspect-[1.5] m-5 flex flex-col justify-between">
      <div className="flex justify-between">
          <h1 className="text-xl">
            {apiData.name}
          </h1>
          <a className="p-3" href={apiData.html_url} target="_blank" rel="noopener noreferrer"><GoArrowUpRight /></a>
      </div>
      <div className="max-w-[400px] py-5 ">
          <p className="text-slate-600">
            {apiData.description}
          </p>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-1">
          <GoDotFill />
          {apiData.language}
        </div>
        <div className="flex items-center gap-1">
          <GoStarFill />
          {apiData.stargazers_count}
        </div>
        <div className="flex items-center gap-1">
          <GoRepoForked />
          {apiData.forks_count}
        </div>
        <div className="flex items-center gap-1">
          <GoStop />
          {apiData.open_issues_count}
        </div>
      </div>
    </div>
  )
}

export default RenderRepo