
import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import Forms from "/Component/theme/forms";
import { Title } from "/lib";
import { useEffect, useState } from "react";
import { LangContext } from "../../../lib";

export default function Tires({ lang }) {
    let [icon, setIcon] = useState('http://localhost:3000/_next/image?url=%2Fimages%2Flogo.png&w=64&q=75')
    // images
    let [images, setImages] = useState([]);
    let open = () => document.querySelector('.forms').classList.toggle('none')
    let style = {
        width: '-webkit-fill-available',
        maxWidth: '-webkit-fill-available',
    }
    useEffect(() => {

        document.querySelector('[name=icon]').addEventListener('change', (e) => {
            let file = e.target.files[0]
            console.log(file);
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => setIcon(e.target.result)

        })


        document.querySelector('[name=images]').addEventListener('change', (e) => {
            // images to base64 and push to array
            let files = e.target.files;

            function readAndPreview(file) {
                // Make sure `file.name` matches our extensions criteria
                if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    const reader = new FileReader();
                    let imgesSet = [...images];
                    reader.onloadend = (a) => imgesSet.push(a.target.result)
                    reader.onprogress = (b) => imgesSet.push(b.target.result)
                    reader?.readAsDataURL(file);
                    setImages(imgesSet)
                }
            }

            if (files) {
                Array.prototype.forEach.call(files, readAndPreview);
            }

            // files?.map((file, i) => {
            //     let reader = new FileReader();
            //     console.log(reader);
            //     // reader?.readAsDataURL(file);
            //     reader.onloadend= () => setImages([...images, reader.result])

            // })
        })
    }, [])
    console.log(images)
    return (
        <div className="box col w-full ">
            <Head>
                <title>{lang.add_tire}</title>
            </Head>
            <Title title={lang.add_tire} ui />

            <div className="box grid alignX">
                <Forms type=' ' formStyle={style} style={style} >


                    <div className='box grid'>
                        <div className='box col'>
                            <b>basic information</b>
                            <hr />
                            <Input type='text' name='brind' placeholder="BMW" title='Brind' style={{ width: '20rem' }} />
                            <Input type='text' name='model' title='Model' style={{ width: '20rem' }} />
                            <Input type='text' name='location' placeholder="0" title='Location' style={{ width: '20rem' }} />
                            <Input type='text' name='private' placeholder="0" title='private Notes' style={{ width: '20rem' }} />
                            <Input type='text' name='public' placeholder="0" title='public Notes' style={{ width: '20rem' }} />

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
                                <img src={icon} style={{ width: '20rem' }} />
                            </div>
                            <hr />
                            <div className='box col alignX '>
                                <Input type='file' name='images' title='photos tires' style={{ width: '20rem' }} accept="image/png, image/jpeg, " multiple />
                            </div>
                        </div>
                    </div>
                </Forms>
                {/* <div className="ui box col w-14 alignY ">
                    <img src={icon} alt="icon" width={'200px'} />
                </div> */}
            </div>
        </div >
    )
}
export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let lang = LangContext(locale)

    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/tires', permanent: true } }
    else return { props: lang }
} 