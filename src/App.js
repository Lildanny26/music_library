import './App.css';
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
//import { DataContext } from './Context/DataContext'
//import { SearchContext } from './Context/SearchContext'
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import { Fragment } from 'react'


const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  //let searchInput = useRef ('')

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
    setSearch(term)
}

return (
    <div>
        {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        <Gallery data={data} />
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;