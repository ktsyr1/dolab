import '../styles/globals.css'
import '../styles/style.sass'
import '../styles/theme.sass'
import '../styles/theme@v2.sass'
import Layout from '../Component/layouts/app'
import { useRouter } from 'next/router'
import LayoutAdmin from 'Component/layouts/admin'

function MyApp({ Component, pageProps }) {
    let route = useRouter()
    if (route.asPath.slice(0, 6) !== "/admin") {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
    } else {
        return (
            <LayoutAdmin>
                <Component {...pageProps} />
            </LayoutAdmin>
        )
    }
}

export default MyApp
