import React, {useState, useEffect} from "react";
import axios from "axios";

// Root component which holds api logic

const Root = () => { 

  // state variables
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState(null)  

  // updates state change for search input
  const handleChange = e => {
    setSearchValue(e.target.value)
  }

  // fetching wikipedia data function
  const fetchWiki = (search) => {
    const wikiEndpoint = 'https://simple.wikipedia.org/w/api.php'
    const wikiParams = '?action=query'
    + "&list=search" // request search results in array
    + `&srsearch=${search}` // specify search term
    + "&srlimit=50" // 100 results 
    + "&exsentences=2" // request first 2 sentences from wiki page
    + "&explaintext=1" // requests API to provide content in plain text
    + "&format=json" // requests data in JSON format
    + "&formatversion=2" // JSON easier to navigate
    + "&origin=*" // ommiting causes error

    const wikiLink = wikiEndpoint + wikiParams
    console.log(wikiLink)

    const wikiConfig = {
      timeout: 3000
    }

    // async http get request/response function to mediawiki api 
    async function getWikiResponse(url, config){
      const res = await axios.get(url,config)
      return res.data
    }
    return getWikiResponse(wikiLink, wikiConfig).then(res => {
      setSearchResults(res.query)
      console.log(searchResults)
    }).catch(err => console.log(err))
  }

  const formatWikiData = data => {
    const dataArray = data.search
    dataArray.map(entry => {
      const formattedTitle = entry.title.replace(/\s/g, '')
      const wikiLink = `https://en.wikipedia.org/wiki/${formattedTitle}`
    })
  }


  return (  
    <div className="main-page-container">
      <div className="input-text-random-container">
        <span>Please click on the icon</span>
        <input className="search-input" type="text" onChange={handleChange} value={searchValue}/>
        <button onClick={() => fetchWiki(searchValue)}>Search</button>
      </div>
    </div>
    )
}

export default Root;