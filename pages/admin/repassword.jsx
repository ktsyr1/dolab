import { Input } from "lib/micro";
import Link from "lib/link";
import Head from "next/head";
import { useState } from "react";

export default function Repassword() {
    let title = 'repassword'
    return (
        <div className="box alignX">
            <Head>
                <title> {title}  </title>
            </Head>
            <div className='box col ui w-full from'>
                <h1 className="box alignX m-5" > {title} </h1>
                <Input type='email' name='email' placeholder="username@mail.com" title='email' />
                <button className="btn"> </button>
            </div>
        </div >
    )
} 