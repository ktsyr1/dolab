
import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import Forms from "/theme/forms";
import { Title } from "/lib";

export default function Tires({ tires, Text }) {
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
            <div>
                {tires?.map((tire, i) => {
                    return <p className="p m w-full ui" key={i}> {tire.Brind}</p>

                })}
            </div>
        </div >
    )
}

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/tires', permanent: true } }
    else return { props: { tires, Text: Text[locale.slice(0, 2)] } }
}
let tires = [
    { "Brind": "bmw", "Model": "1999", "Location": "tt", "type": "tt", "private": "tt", "public": "0", "width": "120", "aspect": "10", "Rim": "20", "speed": "100", "Tread": "lk", "stock": "kl", "Cost": "kl", "Wholesale": "lk", "Retail": "lk", "icon": "kl", "images": "lk" },
    { "Brind": "bmw", "Model": "2000", "Location": "tt", "type": "tt", "private": "tt", "public": "0", "width": "120", "aspect": "10", "Rim": "20", "speed": "100", "Tread": "lk", "stock": "kl", "Cost": "kl", "Wholesale": "lk", "Retail": "lk", "icon": "kl", "images": "lk" },
    { "Brind": "jeep", "Model": "1999", "Location": "tt", "type": "tt", "private": "tt", "public": "0", "width": "120", "aspect": "10", "Rim": "20", "speed": "100", "Tread": "lk", "stock": "kl", "Cost": "kl", "Wholesale": "lk", "Retail": "lk", "icon": "kl", "images": "lk" },
    { "Brind": "bmw", "Model": "1999", "Location": "tt", "type": "tt", "private": "tt", "public": "0", "width": "120", "aspect": "10", "Rim": "20", "speed": "100", "Tread": "lk", "stock": "kl", "Cost": "kl", "Wholesale": "lk", "Retail": "lk", "icon": "kl", "images": "lk" },
    { "Brind": "bmw", "Model": "1999", "Location": "tt", "type": "tt", "private": "tt", "public": "0", "width": "120", "aspect": "10", "Rim": "20", "speed": "100", "Tread": "lk", "stock": "kl", "Cost": "kl", "Wholesale": "lk", "Retail": "lk", "icon": "kl", "images": "lk" },

]