import React, {useState, useEffect} from "react";


// Root component which holds api logic

const Root = () => { 

  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState(null)  


  const handleChange = e => {
    setSearchValue(e.target.value)
  }

  const fetchWiki = () => {
    const wikiEndpoint = 'https://simple.wikipedia.org/w/api.php'
    const wikiParams = '?action=query'
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

    async function getWikiResponse(url, config){
      const res = await axios.get(url,config)
      return res.data
    }
    return getWikiResponse(wikiLink, wikiConfig).then(res => {

    }).catch(err => console.log(err))
  }

  return (  
    <div className="main-page-container">
      <div className="input-text-random-container">
        <span>Please click on the icon</span>
        <input className="search-input" type="text" onChange={handleChange} value={searchValue}/>
        <button>Search</button>
      </div>
    </div>
    )
}

export default Root;