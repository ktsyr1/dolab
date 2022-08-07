
import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import Forms from "/Component/theme/forms";
import { Title } from "/lib";

export default function Tires({ Text }) {
    // let open = () => document.querySelector('.forms').classList.toggle('none')
    return (
        <div className="box col w-full ">
            <Head>
                <title>{Text.tires}</title>
            </Head>
            <Title title={Text.tires} ui >
                <Link href="/admin/tires/add" >
                    <button className="btn ">{Text.add_tire}</button>
                </Link>
                {/* <button className="btn " onClick={open}>{Text.add_tire}</button> */}
            </Title>
        </div >
    )
}

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/tires', permanent: true } }
    else return { props: { Text: Text[locale.slice(0, 2)] } }
} 