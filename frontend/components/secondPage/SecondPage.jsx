import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";


const SecondPage = () => {

  // state variables
  const location = useLocation();
  const [searchValue, setSearchValue] = location !== null ? useState(location.state.search) : useState("");
  const [searchResults, setSearchResults] = useState([]);

  // useEffect to make api call asynchronous to page render
  useEffect(() => {
    if (searchValue !== undefined) {
    fetchWiki();
    }
    
  }, []);

  // wikimedia api call  
  const fetchWiki = async () => {
    const wikiEndpoint = 'https://simple.wikipedia.org/w/api.php'
    const wikiParams = '?action=query'
    + "&list=search" // request search results in array
    + `&srsearch=${searchValue}` // specify search term
    + "&srlimit=50" // 50 results 
    + "&srprop=snippet" //extract from page
    + "&explaintext=1" // requests API to provide content in plain text
    + "&format=json" // requests data in JSON format
    + "&formatversion=2" // JSON easier to navigate
    + "&origin=*" // ommiting causes error

    const wikiLink = wikiEndpoint + wikiParams
    

    // async http get request/response function to mediawiki api 
    async function getWikiResponse(url){
      const res = await axios.get(url)
      return res.data
    }
    try {
      const res_1 = await getWikiResponse(wikiLink);
      setSearchResults(res_1.query.search);
    } catch (err) {
      return console.log(err);
    }
  }

  // function to format wiki title with underscores for spaces
  const formatWikiTitle = title => {
    const formattedTitle = title.replace(/\s/g, "_")
    return formattedTitle
  };

  // function to format snippet string and remove any html tags
  const formatWikiString = string =>{
    return string.replace( /(<([^>]+)>)/ig, '');
  }

// conditional rendering based on results array length
if (searchResults.length < 1) {
  return (
    <div className='oops-container'>
      <h1 className="oops-message">
      Oops nothing here...
      Try a different search!
      </h1>
      <Link className="back-to-search-button" to="/">
        Back to Search
      </Link>
    </div>
    );
} else {
  return (
    <div className="results-container">
      <h1 className="second-page-title">CNYCN Wiki App</h1>    
      <Link className="back-button" to="/">Back to Search</Link>
      <h1 className="results-text">Results for: {searchValue}</h1>
      <div className="array-container wrap">
      {searchResults.map((entry, i) => (
        <a href={`https://wikipedia.org/wiki/${formatWikiTitle(entry.title)}`} key={`link${i}`} className="result-link" target="_blank">
          <h2 className="entry-title">{entry.title}</h2>
          <p className="entry-text">{formatWikiString(entry.snippet)}...</p>
        </a>
      ))}
      </div>
    </div>
  )};

}

export default SecondPage;