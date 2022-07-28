import Head from "next/head";

export default function Login() {
    return (
        <div className="box alignX">
            <Head>
                <title>login</title>
            </Head>
            <from className='box col ui w-full'>
                <h1 className="box alignX">login</h1>
                <p>email</p>
                <input type='email' name='email' />
                <p>password</p>
                <input type='password' name='password' />
                <button className="btn">login</button>
            </from>
        </div>
    )
}
