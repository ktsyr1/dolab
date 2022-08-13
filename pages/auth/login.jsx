import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { useRouter } from "next/router";

export default function Login({ Text }) {
    let route = useRouter()
    let { query } = route
    function Send() {
        // set token to cookie
        document.cookie = cookie.serialize("token", "123456789", {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            sameSite: "strict",
            secure: true
        });
        // reload
        if (query?.back) return route.replace(query?.back)
        else return route.reload('/')
    }

    return (
        <div className="box alignX">
            <Head>
                <title>{Text.login}</title>
            </Head>
            <from id='forms' className='box col ui w-full'>
                <h1 className="box alignX m-5">{Text.login}</h1>
                <Input type='email' name='email' placeholder="username@mail.com" title={Text.email} />
                <Input type='password' name='password' title={Text.password} />
                <Link href={'/auth/repassword'} className='p' style={{ display: 'flex', justifyContent: 'flex-end' }} >{Text.forgot_password}</Link>
                <button className="btn" onClick={Send} >{Text.login}</button>
            </from>
        </div >
    )
}

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (cookies?.token) return { redirect: { destination: '/', permanent: true } }
    else return { props: { Text: Text[locale.slice(0, 2)] } }
} 