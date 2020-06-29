import useSWR from 'swr'
import fetch from 'unfetch'


const fetcher = url => fetch(url).then(r => r.json());


export default function Temperature() {
  const { data, error } = useSWR('http://localhost:3000/api/mth-mean-surface-temp', fetcher)
    console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <div>hello !</div>
}

"test api:  'https://jsonplaceholder.typicode.com/todos/1'"