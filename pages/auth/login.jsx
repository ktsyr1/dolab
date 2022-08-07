import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";

export default function Login({ Text }) {
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
                <button className="btn" >{Text.login}</button>
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