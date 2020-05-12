import React, { Fragment, useState, useEffect } from "react";
import SearchBar from './SearchBar';

const ListResults = (searchValue) => {
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  async function getResults(searchValue) {
    const response = await fetch(`/news/:${searchValue}`);
    const resultsArray = response.json();
    const articles = resultsArray.articles;
    setResults(articles);
  //  if (results !== null) {setCheckedItems(results)};

  }

  useEffect(() => {
    getResults();
  }, [searchValue]
  )


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
        {!checkedItems ? (
          <tr><td> no results</td></tr>
        ) : (
        results.map((item) => (
          <tr key={item.url}>
            <td>{item.author}</td>
            <td>{item.description}</td>
            <td>{item.content}</td>

          </tr>
        )))}
      </tbody>
    </table>
  </Fragment>
);


}

export default ListResults;
