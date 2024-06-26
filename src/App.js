import './App.css';
import { useEffect, useState, useRef } from 'react'
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext'


const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef ('')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
      if(search) {
          const fetchData = async () => {
              document.title = `${search} music`
              const response = await fetch(API_URL + search)
              const resData = await response.json()
              if (resData.results.length > 0) {
                  return setData(resData.results)
              } else {
                  return setMessage('Not Found.')
              }
          }
          fetchData()
      }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}

  return (
      <div className='App'>
          <SearchContext.Provider value={{
				term: searchInput,
				handleSearch: handleSearch
			}}>
                    <SearchBar />
			</SearchContext.Provider>
			{message}
          <DataContext.Provider value={data} >
          <Gallery />
          </DataContext.Provider>
      </div>
  )
}

export default App