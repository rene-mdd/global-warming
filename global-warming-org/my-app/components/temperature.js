import React from 'react'
import fetchJsonp from "fetch-jsonp"

class Temperature extends React.Component {
constructor(props){
    super(props);
    console.log(props)
    this.url = ' http://www.hqcasanova.com/co2';
}  

  componentDidMount() {
    
    fetchJsonp(this.url, {
      jsonpCallbackFunction: null,
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
    // fetch(this.url)
    // .then(res => res.json())
    // .then(data => console.log(data));
    
  }


  render() {
    return (
        <>
    <div>test</div>
    <button >GET</button>
    </>
    )
  }
}




// "simple fetch:"
// fetchButton = () => {
    
//   fetch("test.csv", {
//     method: 'GET',
//     mode: "no-cors",
//     headers: {
//       'Content-Type': 'text/plain',
//     }})
//   .then(response => response.text())
//   .then((response) => {
//       console.log(response)
//   })
//   .catch(err => console.log(err))
//   }

// function getData(pageId) {
//   var myRequest = new Request(pageId);
//   fetch(myRequest, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'text/plain'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   }).then(function(response) {
//     console.log(response)
//     return response.text().then(function(text) {
//     console.log(text)
//       return text
//     });
//   });
// }

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     const res = await fetch(fetchFile)
//     console.log(res)
//     const posts = await res.json()
    
//     // By returning { props: posts }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         posts,
//         res
//       },
//     }
//   }

  export default Temperature;