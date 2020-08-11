import React, {Fragment, useState, useEffect} from "react" ;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3f8137d4b5474ecf8b8f0aebb0afb18e');

const ListNews = () => {
  const [news, setNews] = useState([]);

/*  async function getNews() {
    newsapi.v2.topHeadlines({

      q: 'bitcoin',

    }).then(response => {
      console.log(response)
      const newsArray = response.articles;
      setNews(newsArray);
    })

  }
  */

  async function getTopHeadlines() {
    const response = await fetch('news/topheadlines');
    const tickArray = await response.json();
    const articles = tickArray.articles;
    setNews(articles);
  }

  useEffect(() => {
    getTopHeadlines()
  }, []
);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
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

export default ListNews;
