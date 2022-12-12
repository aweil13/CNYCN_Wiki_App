CNYCN Wiki App is a single page web application where a user can enter a search value and generate a list of wikipedia entries or be taken to a random wiki entry to view. The application does so by requesting data from the MediaWiki API with a random or a specific search param.

# Technologies/Libraries used

* Ruby on Rails
* React
* React-Dom
* React-Router-Dom
* Node Packet manager(NPM)
* Babel
* Webpack
* Axios
* Javascript
* HTML/CSS

## API Call Code Snippet

```js
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
      const res = await axios.get(url);  
      return res
    }
    try {
      const res_1 = await getWikiResponse(wikiLink);
      const title = formatWikiTitle(res_1.data.query.random[0].title);
      setRandomWikiLink(`https://wikipedia.org/wiki/${title}`);
      setIsLoaded(true);
      
    } catch (err) {
      return console.log(err);
    }
  };

```

# Potential Improvememts

* Routing for the second page is dependent on going from the first page, would like that to be independent.

* Style wise it's functional but not stylish and would like to improve on the visuals.

* Better use of the random function, right now it's generating a single title per page load. It would be better if it would generate it every click of the random button.

* Use rails more, right now most of the logic is kept in the React components/hooks in the frontend folder. 

* Some weird text gets through in the entries, haven't been able to figure out how to replace it with a JS function because it is rarely seen.

* Better snippets from the wiki api, some are nonsensical but not sure what could be done about this.

* More dynamic effects on the page since it's a simple application.