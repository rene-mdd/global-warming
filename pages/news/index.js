import React from "react"
import Head from 'next/head'
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('650daed4968f46c08ba16576a99adffe');



class News extends React.Component {
constructor(props){
  super(props)
  this.state = {
    news: []
  }
 
}

componentDidMount() {

  newsapi.v2.everything({
    q:"global warming",
    language: "en",
    sortBy: "popularity",
    pageSize: 100
  }).then(response => {
    // const cleanObj = JSON.parse(JSON.stringify(response))
  this.setState({news: response.articles});
  }).catch(error => {console.error(error)}) 
}

  render() {
    setTimeout(() => { console.log(this.state.news) }, 1000)
    

    return (<>
    <div className="ui container move-down">
    <div className="ui items">
      {
      this.state.news.map(({author, title, description, publishedAt, urlToImage, source, url}) => {
        return(
   <div className="item">
   <img className="ui small middle aligned image" src={urlToImage} />
     <div className="content">
   <a href={url} className="header">{title}</a>
       <div className="meta">Author: {author}</div>
       <div className="description">
        <p>{description}</p>
       </div>
       <div className="extra">Date: {publishedAt}<div className="ui bottom right attached label">
         <i aria-hidden="true" className="newspaper outline icon"></i>
         {source.name}
       </div></div>
       
     </div>
   </div>)
      })}
 
  </div>
  </div></>)
  }
}
  export default News