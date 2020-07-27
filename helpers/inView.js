import { InView } from 'react-intersection-observer'
 
const View = () => (
  <InView as="div" onChange={(inView, entry) => {
      return viewFunc(inView)
      console.log('Inview:', inView)}}>
    <h2>View</h2>
  </InView>
)

export default View