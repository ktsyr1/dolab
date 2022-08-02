import Head from 'next/head'
import { useRouter } from 'next/router'
export default function Home() {
    let { locales, defaultLocale } = useRouter()
    console.log(locales);
    return (
        <div className='box alignX' >
            <Head>
                <title>dolib app</title>
            </Head>
            <div className="box alignY alignX h-10 ui w-10  ">
                content
            </div>
        </div>
    )
}
