import React from "react"
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
let credentials = new CognitiveServicesCredentials('feaf1751d8b142c68ca34b339e04dfbc');
let search_term = 'global warming'
const NewsSearchAPIClient = require('azure-cognitiveservices-newssearch');
let client = new NewsSearchAPIClient(credentials);



class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    }
  

  render() {
    console.log(this.state.gNews)
    console.log(this.props.data.value)
    const parsedGNews = JSON.parse(JSON.stringify(this.state.gNews))
    const parsedBingNews = JSON.parse(JSON.stringify(this.props.data.value))

    const duplicateRemovalBing = parsedBingNews.filter((thing, index, self) =>
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
            duplicateRemovalGNews.map((obj) => {


              return (
                <div className="item">
                  <img className="ui small middle aligned image" src={obj.image} />
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
          {duplicateRemovalBing.map((obj) => {
          
            return (
              
              <div className="item">
                {/* <img className="ui small middle aligned image" src={obj.image || obj.image.thumbnail ? obj.image.thumbnail.contentUrl : obj.provider || obj.provider.image.thumbnail ? obj.provider.image.thumbnail.contentUrl : "/images/breaking-news.png"} /> */}
                <div className="content">
                  <a href={obj.url} className="header">{obj.name}</a>
                  <div className="meta">Source: {obj.provider.name} </div>
                  <div className="description">
                    <p>{obj.description}</p>
                  </div>
                  <div className="extra">Date: {obj.datePublished}<div className="ui bottom right attached label">
                    {/* <img className="mini-icon" src={obj.provider.image.thumbnail.contentUrl}/> */}
                    {obj.provider.name}
                  </div></div>

                </div>
              </div>)
          })
          }

        </div>
      </div></>)
  }
}

export async function getServerSideProps() {
  const resp = await client.newsOperations.search(search_term, {
    market: "en-XA",
    count: 100
  });
  const json = JSON.parse(JSON.stringify(resp));
  const data = await json;
  return {props: {data}}
}

export default News;

