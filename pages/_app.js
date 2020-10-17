import '../global-styles/main.css'
import 'semantic-ui-css/semantic.min.css'
import "../global-styles/burger-menu.css"
import NextNProgress from '../helpers/index'

export default function MyApp({ Component, pageProps }) {
  return (<>
  <NextNProgress />
  <Component {...pageProps} />
  </>)
 
}