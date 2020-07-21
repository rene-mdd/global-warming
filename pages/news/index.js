import React from "react"
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('650daed4968f46c08ba16576a99adffe');



class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsApi: [],
      gNews: []
    }
  }

  componentDidMount() {

    fetch('https://gnews.io/api/v3/search?q="climate change"&lang=en&image=required&token=a6e3927e03b68f9e1b73d16124863e92')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return this.setState({ gNews: data.articles })
      }).catch(error => { console.error(error) });

    newsapi.v2.everything({
      q: "global warming",
      language: "en",
      sortBy: "popularity",
      pageSize: 50
    }).then(response => {
      this.setState({ newsApi: response.articles });
    }).catch(error => { console.error(error) })
  }

  render() {
    console.log(this.state.newsApi);
    console.log(this.state.gNews)
    const parsedNewsApi = JSON.parse(JSON.stringify(this.state.newsApi))
    const parsedGNews = JSON.parse(JSON.stringify(this.state.gNews))
    const duplicateRemovalNewsApi = parsedNewsApi.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.description === thing.description
      ))
    )
    const duplicateRemovalGNews = parsedGNews.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.description === thing.description
      ))
    )

    return (<>
    
      <div className="ui container move-down">
        <div className="ui items">
          {
            duplicateRemovalNewsApi.map((obj) => {


              return (
                <div className="item">
                  <img className="ui small middle aligned image" src={obj.urlToImage} />
                  <div className="content">
                    <a href={obj.url} className="header">{obj.title}</a>
                    <div className="meta">Author: {obj.author}</div>
                    <div className="description">
                      <p>{obj.description}</p>
                    </div>
                    <div className="extra">Date: {obj.publishedAt}<div className="ui bottom right attached label">
                      <i aria-hidden="true" className="newspaper outline icon"></i>
                      {obj.source.name}
                    </div></div>
                  </div>
                </div>)
            })}
          {duplicateRemovalGNews.map((obj) => {
            return (
              <div className="item">
                <img className="ui small middle aligned image" src={obj.image} />
                <div className="content">
                  <a href={obj.url} className="header">{obj.title}</a>
                  <div className="meta">Source: {obj.source.url} </div>
                  <div className="description">
                    <p>{obj.description}</p>
                  </div>
                  <div className="extra">Date: {obj.publishedAt}<div className="ui bottom right attached label">
                    <i aria-hidden="true" className="newspaper outline icon"></i>
                    {obj.source.name}
                  </div></div>

                </div>
              </div>)
          })
          }

        </div>
      </div></>)
  }
}
export default News