import useSWR from 'swr'
// import fetch from 'unfetch'
import axios from "axios"


// const fetcher = url => fetch(url).then(r => r.json());


export default async function Co2() {
  const { data, error } = await fetch('https://datahub.io/core/co2-ppm-daily/datapackage.json',      {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }})
    console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <div>hello !</div>
}

