import { Input } from "lib/micro";
import Link from "lib/link";
import Head from "next/head";
import { useState } from "react";
import cookie from "cookie";

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
                <button className="btn" > {title}</button>
            </div>
        </div >
    )
} 

export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (cookies?.token) return { redirect: { destination: '/', permanent: true } }
    else return { props: { msg: 1 } }
} 