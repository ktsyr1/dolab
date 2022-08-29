import { Input } from "/theme/forms";
import Head from "next/head";
import cookie from "cookie";

export default function Signup({ Text }) {
    return (
        <div className="box alignX">
            <Head>
                <title>{Text.signup}</title>
            </Head>
            <div id='forms' className='box col ui w-full from'>
                <h1 className="box alignX m-5" >{Text.signup}</h1>
                <Input type='email' name='email' placeholder="username@mail.com" title={Text.email} />
                <Input type='text' name='username' placeholder="username" title={Text.username} />
                <Input type='password' name='password' title={Text.password} />
                <Input type='password' name='repassword' title={Text.repassword} />
                {/* <span style={{ color: 'red', padding: '10px' }}  >{alert}</span> */}
                <button className="btn" >{Text.signup}</button>
            </div>
        </div >
    )
}

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (cookies?.token) return { redirect: { destination: '/', permanent: true } }
    else return { props: { Text: Text[locale.slice(0, 2)] } }
} 