import '../styles/globals.css'
import '../styles/style.sass'
import '../styles/theme.sass'
import '../styles/theme@v2.sass'
import Layout from '/lib/layouts/app'
import { useRouter } from 'next/router'
import LayoutAdmin from '/lib/layouts/admin'


import NProgress from 'nprogress'; //nprogress module 

import 'nprogress/nprogress.css';  
import Router from 'next/router';

NProgress.configure({
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.5,
    easing: 'ease',
    trickle: true,
    trickleSpeed: 200,
    trickleFadeSpeed: 200, // speed of fade out
    trickleRate: 1,
})
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
