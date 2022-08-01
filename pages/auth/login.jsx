import { Input } from "/lib";
import Link from "/lib";
import Head from "next/head";
import cookie from "cookie";

export default function Login() {
    return (
        <div className="box alignX">
            <Head>
                <title>login</title>
            </Head>
            <from className='box col ui w-full'>
                <h1 className="box alignX m-5">login</h1>
                <Input type='email' name='email' placeholder="username@mail.com" title='email' />
                <Input type='password' name='password' title='password' />
                <Link href={'/auth/repassword'} className='p' style={{ display: 'flex', justifyContent: 'flex-end' }} >Forgot Password ?</Link>
                <button className="btn" >login</button>
            </from>
        </div >
    )
}

export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (cookies?.token) return { redirect: { destination: '/', permanent: true } }
    else return { props: { msg: 1 } }
} 