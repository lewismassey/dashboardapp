import React, { Fragment, useState, useEffect } from "react";
import SearchBar from './SearchBar';

const ListResults = (searchValue) => {
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //async function getResults(searchValue) {
    //const response = await fetch(`/news/:bitcoin`);
    //const resultsArray = response.json();
    //console.log(resultsArray);
    //return resultsArray;
    //const articles = resultsArray.articles;
    //console.log(articles);
  //  setResults(resultsArray);
  //  if (results !== null) {setCheckedItems(results)};
    //setCheckedItems(true);
  //}

/*  useEffect(() => {
    const getResults = async (searchValue) => {
      const response = await fetch(`/news/:${searchValue}`);
      const resultsArray = response.json();
      console.log(resultsArray);
      setResults(resultsArray);
    }
    getResults();

  }, [searchValue]
) */

useEffect(() => {
  console.log('first run')
}, [searchValue]
)


const getResults = searchValue => {
    setIsLoaded(true);
    setErrorMessage(null);

    fetch(`/news/:${searchValue}`)
      .then(response => response.json())
      .then(data => {

          setResults(data.articles);
          setIsLoaded(true);

      });
      console.log(results)
  	};


return (
  <Fragment>
    {" "}
    <table className="table mt-5">
      <thead>
        <tr><td><SearchBar getResults={getResults}/></td></tr>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
        results.map((item) => (
          <tr key={item.url}>
            <td>{item.author}</td>
            <td>{item.description}</td>
            <td>{item.content}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);


}

export default ListResults;
