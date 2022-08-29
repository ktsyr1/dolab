
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";

export default function Admin() {
    return (
        <div className="box alignX">
            <Head>
                <title>admin</title>
            </Head>

            <center>
                <h1>Admin</h1>
                <p>This is the admin page</p>
            </center>
        </div >
    )
}

export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin', permanent: true } }
    else return { props: { msg: 1 } }
} 