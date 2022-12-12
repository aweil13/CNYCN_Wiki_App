import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import axios from "axios";



const FirstPage = () => { 

  // state variables
  const [searchValue, setSearchValue] = useState("")
  const [randomWikiLink, setRandomWikiLink] = React.useState("")
  const [isLoaded, setIsLoaded] = React.useState(false)

  // updates state change for search input
  const handleChange = e => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  };

  // use effect to run async api call and populate necessary state variables before render
  useEffect(() => {
    randomWiki();
  }, []);

  // api call using wikimedia to receive single title from random page to then populate wiki link state variable
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
      setRandomWikiLink(`https://wikipedia.org/wiki/${title}`);
      setIsLoaded(true);
      console.log(isLoaded);
    } catch (err) {
      return console.log(err);
    }
  };

  // function to format title
  const formatWikiTitle = title => {
    const formattedTitle = title.replace(/\s/g, "_")
    return formattedTitle
  };

  if (!isLoaded) {
    return (
      null
    )
  } else { 
  return (  
    <div className="main-page-container">
      <div className="input-text-random-container">
        <h1 className="app-title">CNYCN Wiki App</h1>
        <span className="prompt">Click to Search</span>
        <input className="search-input" type="text" onChange={handleChange} value={searchValue}/>
        <Link to="/results" state={{search: searchValue}} className="results-button">Results</Link>
        <a href={randomWikiLink} target="_blank" className="random-link">Random Article</a>
      </div>
    </div>
    )}
}

export default FirstPage;