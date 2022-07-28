import '../styles/globals.css' 
import '../styles/style.sass'
import Layout from '../Component/layouts/app'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp