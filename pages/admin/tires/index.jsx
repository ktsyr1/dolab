
import { Input } from "/theme/forms";
import { LangContext, Link } from "/lib"
import Head from "next/head";
import cookie from "cookie";
import Forms from "/theme/forms";
import { Title } from "/lib";
import { useEffect, useState } from "react";
import { Popconfirm, Table } from 'antd';
import { useRouter } from "next/router";
import { PencilOutline, TrashOutline } from "react-ionicons";
import 'antd/dist/antd.css'

export default function Tires({ tires, Text }) { 
    let [data, setData] = useState(tires)
    let { locale, asPath } = useRouter()
    let lang = LangContext(locale)
    
    function DeleteOne() {
        return
    }
    const columns = [
        { title: lang.brand, dataIndex: 'brand', editable: true },
        { title: lang.model, dataIndex: 'model', editable: true },
        {
            title: lang.category, dataIndex: 'category', width: '300px',
            render: (_, record) => {
                let category = record.category
                category = typeof category === 'string'
                    ? category.trim().split(',')
                    : category
                if (category.length >= 1)
                    return (
                        <div className="box row">
                            {category?.map((item, i) => (
                                <p className='ui' href={`/tires/${record.id}`} key={i} passHref> {item} </p>
                            ))}
                        </div>
                    )
            }
        },
        { title: lang.width, dataIndex: 'width', width: '100px' },
        { title: lang.aspect, dataIndex: 'aspect', width: '100px' },
        { title: lang.rim, dataIndex: 'rim', width: '100px' },
        {
            title: '', dataIndex: '', width: '100px',
            render: (_, record) => {
                if (data.length >= 1) {
                    console.log(record);
                    return (
                        <div className="box row" >
                            <Link href={`${asPath}/${record.id.toString()}`} style={{ margin: '0 10px' }} >
                                <PencilOutline title={'Edit'} color={'#00000'} height="25px" width="25px" />
                            </Link>
                            <Popconfirm title={lang.sure_to_delete} onConfirm={() => DeleteOne(record)}>
                                <TrashOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                            </Popconfirm>
                        </div>
                    )
                }
            }

        },
    ];
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
                <Table
                    dataSource={data}
                    columns={columns}
                    // expandable={{
                    //     expandedRowRender: this.expandedRowRender,
                    //     defaultExpandedRowKeys: ['0'],
                    // }}
                    pagination={false}
                // bordered
                />
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
export const tires = [
    {
        "brand": "dfg",
        "model": "sdsfds",
        "location": "لبنان - البقاع الاوسط",
        "private": "hv",
        "public": ".n",
        "width": "67",
        "rim": "56",
        "aspect": "76",
        "speed": "3",
        "tread": "2",
        "stockQty": "2",
        "cost": "6",
        "wholesale": "56",
        "retail": "65",
        "category": "dfhfgdh ,hgjtuj ,we",
        "id": 1
    },
    {
        "id": 2,
        "brand": "poo pasdasd",
        "model": "sdsfdse4",
        "location": "لبنان - البقاع الاوسط",
        "private": "bn",
        "public": "b ,",
        "category": "dfhfgdh ,hgjtuj ,we",
        "cost": "34",
        "wholesale": "56",
        "retail": "65",
        "speed": "6",
        "tread": "5",
        "stockQty": "3",
        "rim": "56",
        "aspect": "76",
        "width": "67",
        "icon": "C:\\fakepath\\57572426_1188425187985832_256640943229239296_n.jpg",
        "images": []
    },
    {
        "id": 3,
        "images": [],
        "icon": "C:\\fakepath\\download.png",
        "brand": "dfgqw",
        "location": " ewewe",
        "model": "weq",
        "private": "qwe",
        "width": "67",
        "aspect": "76",
        "rim": "56",
        "speed": "223",
        "tread": "23",
        "stockQty": "23",
        "cost": "34",
        "wholesale": "34",
        "retail": "53",
        "category": "dfhfgdh ,hgjtuj ,we"
    }
]