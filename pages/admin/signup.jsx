import { Input } from "lib/micro";
import Link from "lib/link";
import Head from "next/head";
import { useState } from "react";

export default function Signup() {
    // alert state
    const [alert, setAlert] = useState('');
    function ChangePass(e) {
        e.preventDefault();
        let password = document.querySelector('input[name="password"]').value;
        let repassword = document.querySelector('input[name="repassword"]').value;
        if (password.length > 3 && repassword.length > 3) {
            if (password !== repassword) setAlert('Password not match');
        }
        else setAlert('Password must be at least 3 characters');
    }
    return (
        <div className="box alignX">
            <Head>
                <title>Sign up</title>
            </Head>
            <div className='box col ui w-full from'>
                <h1 className="box alignX m-5" >Sign up</h1>
                <Input type='email' name='email' placeholder="username@mail.com" title='email' />
                <Input type='text' name='username' placeholder="username" title='username' />
                <Input type='password' name='password' title='password' onChange={ChangePass} />
                <Input type='password' name='repassword' title='repassword' onChange={ChangePass} />
                {/* <span style={{ color: 'red', padding: '10px' }}  >{alert}</span> */}
                <button className="btn" >Sign up</button>
            </div>
        </div >
    )
} 