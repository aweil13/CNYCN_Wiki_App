import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";


const SecondPage = () => {

  const location = useLocation();
  const [searchValue, setSearchValue] = useState(location.state.search);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchWiki();
    console.log(searchResults);
  }, []);

  const fetchWiki = async () => {
    const wikiEndpoint = 'https://simple.wikipedia.org/w/api.php'
    const wikiParams = '?action=query'
    + "&list=search" // request search results in array
    + `&srsearch=${searchValue}` // specify search term
    + "&srlimit=50" // 100 results 
    + "&exsentences=2" // request first 2 sentences from wiki page
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
      setIsLoaded(true);
      console.log(res_1.query.search);
    } catch (err) {
      return console.log(err);
    }
  }

  const formatWikiTitle = title => {
    const formattedTitle = title.replace(/\s/g, "_")
    return formattedTitle
  }

if (!isLoaded) {
  return (null)
} else {
  return (
    <div>
      This is the second page
      <div>{searchValue}</div>
      <Link to="/">Back to Search</Link>
      {searchResults.map(entry => (
        <a href={`https://wikipedia.org/wiki/${formatWikiTitle(entry.title)}`} target="_blank">
          {entry.title}
        </a>
      ))}
    </div>
  )}

}

export default SecondPage;