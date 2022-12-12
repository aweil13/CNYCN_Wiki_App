import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import axios from "axios";



const FirstPage = () => { 

  // state variables
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState(null)  
  const [randomResult, setRandomResult] = React.useState("")
  const [randomWikiLink, setRandomWikiLink] = React.useState("")
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(null)

  // updates state change for search input
  const handleChange = e => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  };

  useEffect(() => {
    randomWiki();
  }, []);




  // random wiki api call
  const randomWiki = async () => {
    const wikiEndpoint = 'https://simple.wikipedia.org/w/api.php'
    const wikiParams = '?action=query'
    + "&format=json"
    + "&list=random"
    + "&rnlimit=1"
    + "&formatversion=2"
    + "&origin=*"

    const wikiLink = wikiEndpoint + wikiParams
    async function getWikiResponse(url){
      const res = await axios.get(url)  
      return res
    }
    try {
      const res_1 = await getWikiResponse(wikiLink);
      const title = formatWikiTitle(res_1.data.query.random[0].title)
      console.log(title);
      setRandomResult(title);
      setRandomWikiLink(`https://wikipedia.org/wiki/${title}`);
      setIsLoaded(true);
      console.log(isLoaded);
    } catch (err) {
      return console.log(err);
    }
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
      console.log(searchValue)
    }).catch(err => console.log(err))
  }

  

  const formatWikiTitle = title => {
    const formattedTitle = title.replace(/\s/g, "_")
    return formattedTitle
  }

  if (!isLoaded) {
    return (
      null
    )
  } else { 
  return (  
    <div className="main-page-container">
      <div className="input-text-random-container">
        <span>Please click on the icon</span>
        <input className="search-input" type="text" onChange={handleChange} value={searchValue}/>
        <button onClick={() => fetchWiki(searchValue)}>Search</button>
        <a href={randomWikiLink} target="_blank">Random Link</a>
        <Link to="/results" state={{search: searchValue}}>Results</Link>
      </div>
    </div>
    )}
}

export default FirstPage;