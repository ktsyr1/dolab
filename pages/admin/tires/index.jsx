
import { Input } from "lib";
import Link from "lib";
import Head from "next/head";
import cookie from "cookie";

export default function Tires() {
    return (
        <div className="box alignX">
            <Head>
                <title>Tires</title>
            </Head>

            <div className='box col ui '>
                <div className='box grid alignX '>
                    <Input type='text' name='brind' placeholder="BMW" title='Brind' style={{ width: '20rem' }} />
                    <Input type='text' name='model' title='Model' style={{ width: '20rem' }} />
                    <Input type='text' name='location' placeholder="0" title='Location' style={{ width: '20rem' }} />
                    <Input type='text' name='location' placeholder="0" title='private Notes' style={{ width: '20rem' }} />
                </div>
                <div className='box grid alignX '>

                    <div className="box row" style={{ width: '20rem' }}>
                        <Input type='text' name='width' placeholder="eg 245" title='width' style={{ width: '6rem' }} />
                        <Input type='text' name='aspect' placeholder="eg 70" title='aspect' style={{ width: '6rem' }} />
                        <Input type='text' name='rim' placeholder="eg 16" title='Rim' style={{ width: '6rem' }} />
                    </div>
                    <div className="box row" style={{ width: '20rem' }}>
                        <Input type='number' name='speed' title='speed/load' style={{ width: '6rem' }} />
                        <Input type='number' name='tread' title='Tread' style={{ width: '6rem' }} />
                        <Input type='number' name='stockQty' title='stock Qty' style={{ width: '6rem' }} />
                    </div>
                </div>
                <div className="box row" style={{ width: '20rem' }}>
                    <Input type='text' name='cost' placeholder="0" title='Cost' style={{ width: '6rem' }} />
                    <Input type='text' name='wholesale' placeholder="0" title='Wholesale' style={{ width: '6rem' }} />
                    <Input type='text' name='retail' placeholder="0" title='Retail' style={{ width: '6rem' }} />
                </div>
                <Input type='text' name='category' placeholder="New , Used , ..." title='tire type' style={{ width: '20rem' }} />
                <b>assets</b>
                <hr />
                <div className='box grid alignX '> 
                    <Input type='file' name='icon' title='photo tires' style={{ width: '20rem' }} />
                    <Input type='file' name='images' title='images' style={{ width: '20rem' }} />

                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/tires', permanent: true } }
    else return { props: { msg: 1 } }
} 