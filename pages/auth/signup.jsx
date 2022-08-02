import { Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";

export default function Signup(data) {
    console.log(data)
    return (
        <div className="box alignX">
            <Head>
                <title>Sign up</title>
            </Head>
            <div id='forms' className='box col ui w-full from'>
                <h1 className="box alignX m-5" >Sign up</h1>
                <Input type='email' name='email' placeholder="username@mail.com" title='email' />
                <Input type='text' name='username' placeholder="username" title='username' />
                <Input type='password' name='password' title='password' />
                <Input type='password' name='repassword' title='repassword' />
                {/* <span style={{ color: 'red', padding: '10px' }}  >{alert}</span> */}
                <button className="btn" >Sign up</button>
            </div>
        </div >
    )
}

export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (cookies?.token) return { redirect: { destination: '/', permanent: true } }
    else return { props: { msg: 1 } }
} 