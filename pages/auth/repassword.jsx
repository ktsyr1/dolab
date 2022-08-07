import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import { useState } from "react";
import cookie from "cookie";

export default function Repassword({Text}) { 
    return (
        <div className="box alignX">
            <Head>
                <title> {Text.repassword} </title>
            </Head>
            <div id='forms' className='box col ui w-full from'>
                <h1 className="box alignX m-5" > {Text.repassword} </h1>
                <Input type='email' name='email' placeholder="username@mail.com" title={Text.email} />
                <button className="btn" > {Text.send}</button>
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