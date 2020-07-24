import React from "react"


class Organizations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gNews: []
    }
  }

  componentDidMount() {

    fetch('http://www.wiser.org', {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/xml',
      }
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
       console.log(data)
      }).catch(error => { console.error(error) });
    }
  
  render() {
   console.log("hola")
    return (<>
    <div>hello</div>
     </>)
  }
}

// export async function getServerSideProps() {
//   const resp = await client.newsOperations.search(search_term, {
//     market: "en-XA",
//     count: 100
//   });
//   const json = JSON.parse(JSON.stringify(resp));
//   const data = await json;
//   return {props: {data}}
// }

export default Organizations;

