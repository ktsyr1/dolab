
import { Input, InputLines } from "/theme/forms";
import { Link, Title } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import Forms from "/theme/forms";
import { useEffect, useState } from "react";
import { LangContext } from "/lib";
import Image from "next/image";
export default function Tires({ lang, dataDef = {} }) {
    // images  
    return (
        <div className="box col w-full ">
            <Head>
                <title>{lang.add_tire}</title>
            </Head>
            <Title title={lang.add_tire} ui />
            <Form lang={lang} dataDef={dataDef} />
        </div >
    )
}
export function Form({ lang, dataDef = {} }) {
    // images
    let [icon, setIcon] = useState(['/_next/image?url=%2Fimages%2Flogo.png&w=64&q=75'])
    let [images, setImages] = useState([]);
    // data
    let [data, setData] = useState(dataDef);
    let [imageSize, setImageSize] = useState(3000000)

    let style = {
        width: '-webkit-fill-available',
        maxWidth: '-webkit-fill-available',
    }
    function Send() {
        let res = localStorage?.getItem('tires')
        // res to json
        let tires = res ? JSON.parse(res) : {}

        let id = 1
        tires?.map(a => a.id < id ? id = a.id + 1 : null)
        let Data = data
        Data['id'] = id
        if (tires.length > 0) localStorage.setItem('tires', JSON.stringify([Data, ...tires]))
        else localStorage.setItem('tires', JSON.stringify([Data]))

    }
    function file2besic(file) {
        if (file?.size < imageSize) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            return new Promise((resolve, reject) => {
                reader.onload = d => resolve(d.target.result)
            })
        }
    }
    async function Changes(e) {
        let { value, files, name } = e.target
        let Data = data
        function Map() {
            let Files = Array.from(files)
            return Promise
                .all(Files?.map(async file => await file2besic(file)))
                .then(res => res)
        }
        if (name === 'category') Data[name] = value.split(',')
        if (name === 'icon') {
            let res = await Map()
            setIcon(res)
        }
        if (name === 'images') Data[name] = await Map()
        else Data[name] = value
        setData(Data)
    }

    return (
        <div className="box grid alignX" onChange={Changes}>
            <Forms type=' ' send={Send} formStyle={style} style={style} >


                <div className='box grid'>
                    <div className='box col'>
                        <b>basic information</b>
                        <hr />
                        <Input type='text' name='brand' placeholder="BMW" title='Brand' style={{ width: '20rem' }} />
                        <Input type='text' name='model' title='Model' style={{ width: '20rem' }} />
                        <Input type='text' name='location' placeholder="0" title='Location' style={{ width: '20rem' }} />
                        <InputLines type='text' name='private' placeholder="0" title='private Notes' style={{ width: '20rem' }} />
                        <InputLines type='text' name='public' placeholder="0" title='public Notes' style={{ width: '20rem' }} />

                    </div>
                    <div className='box col'>
                        <b>Features</b>
                        <hr />
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
                        <div className="box row" style={{ width: '20rem' }}>
                            <Input type='text' name='cost' placeholder="0" title='Cost' style={{ width: '6rem' }} />
                            <Input type='text' name='wholesale' placeholder="0" title='Wholesale' style={{ width: '6rem' }} />
                            <Input type='text' name='retail' placeholder="0" title='Retail' style={{ width: '6rem' }} />
                        </div>
                        <Input type='text' name='category' placeholder="New , Used , ..." title='tire type' style={{ width: '20rem' }} />
                    </div>
                    <div className='box col'>
                        <b>assets</b>
                        <hr />
                        <div className='box col alignX '>

                            <Input type='file' name='icon' title='icon tires' style={{ width: '20rem' }}
                                //  - formats png, jpg, gif, svg
                                accept="image/png, image/jpeg, image/gif"
                            />
                            <Image src={icon[0]} width='200px' height='200px' loading="lazy" alt="icon tires" />
                        </div>
                        <hr />
                        <div className='box col alignX '>
                            <Input type='file' name='images' title='photos tires' style={{ width: '20rem' }} accept="image/png, image/jpeg, " multiple />
                            <div className='box row scroll alignX ' style={{ width: '20rem' }}>

                                {data?.images?.map(file => {
                                    return (
                                        <Image key={file} src={file} width='200px' height='200px' loading="lazy" alt={file} />
                                    )

                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Forms>
            {/* <div className="ui box col w-14 alignY ">
                    <img src={icon} alt="icon" width={'200px'} />
                </div> */}
        </div>
    )
}
export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let lang = LangContext(locale)
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/tires', permanent: true } }
    else return { props: { lang: lang } }
} 