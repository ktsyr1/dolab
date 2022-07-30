import { Input } from "lib/micro";
import Link from "lib/link";
import Head from "next/head";

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
                <Link href={'/admin/repassword'} className='p' style={{ display: 'flex', justifyContent: 'flex-end' }} >Forgot Password ?</Link>
                <button className="btn">login</button>
            </from>
        </div >
    )
} 