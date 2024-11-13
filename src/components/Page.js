import { useCallback, useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import axios from 'axios'
import languages from '../assets/languages.json'
import RenderRepo from './RenderRepo'
const Page = () => {
  const [option, setOption] = useState('Select a language')
  const [apiData, setApiData] = useState(null);
  const [responseStatus, setResponseStatus] = useState('Please select a language')
  const [loading, setLoading] = useState(false)

  let urlRepo = 'https://api.github.com/search/repositories' + '?q='
  let searchTerm = 'language:';
  const fetchTotalCount = useCallback(async (page = 1, element = 1) => {
    try {
      searchTerm = searchTerm + languages.filter(item => item.title === option)[0].value
      const response = await axios({
        method: 'get',
        url: urlRepo + searchTerm + '+stars:>=75&sort=stars&order=desc&per_page=30' + '&page=' + toString(page),
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github+json'
        },
      });
      return response.data.total_count;
    }
    catch (e) {
      setResponseStatus('Error fetching repositories')
    }
  }, [option, loading])
  const fetchData = useCallback(async (page = 1, element = 1) => {
    try {
      setResponseStatus('Loading')
      const response = await axios({
        method: 'get',
        url: urlRepo + searchTerm + '+stars:>=75&sort=stars&order=desc&per_page=30' + '&page=' + toString(page),
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github+json'
        },
      });
      setResponseStatus(option)
      setApiData(response.data.items[element])
      return response.data.total_count;
    }
    catch (e) {
      setResponseStatus('Error fetching repositories')
    }
  }, [option, loading])

  const findRandomRepository = () => {
    let total_count = fetchTotalCount();
    fetchData(Math.floor(Math.random() * total_count / 30) , Math.floor(Math.random() * 29));
  }
  const handleRefresh = () => {
    if (responseStatus !== 'Loading') {
      setLoading(!loading)
    }
  }
  useEffect(() => {
    if (option !== 'Select a language') {
      findRandomRepository();
    }
  }, [fetchData])
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-xl font-[100] hover:font-[420] transition-all ease-in-out delay-75 antialiased m-2'>
        Github repository finder
      </h1>
      <Dropdown option={option} setOption={setOption} languages={languages} />
      <div className='flex flex-col items-center justify-center'>
        <div className={`relative min-w-[300px] min-h-[200px] z-0 ${responseStatus === 'Please select a language' ? 'bg-slate-300 ' : responseStatus === 'Error fetching repositories' ? 'bg-red-300' : responseStatus === 'Loading' ? 'bg-slate-200 border-2' : 'bg-slate-200 border-2 border-slate-500'} rounded-xl m-5 flex justify-center items-center font-medium`}>
          {responseStatus !== option && responseStatus}
          {responseStatus === option && <RenderRepo apiData={apiData} />}
        </div>
        {(option === responseStatus || responseStatus === 'Error fetching repositories') && 
        <button className={`w-[300px] ${responseStatus === option && 'border-slate-800'} ${responseStatus === 'Error fetching repositories' && 'border-red-300'} border-2 ${responseStatus === option && 'hover:bg-white hover:text-slate-800'} ${responseStatus === 'Error fetching repositories' && 'hover:bg-white hover:text-red-400'} transition-all ${responseStatus === option && 'bg-slate-800 text-white'} ${responseStatus === 'Error fetching repositories' && 'bg-red-300 text-white'} rounded-full py-2 font-medium my-1`}
          onClick={handleRefresh}
        >
          Refresh
        </button>
        }
      </div>
    </section>
  )
}

export default Page