
import { Input, LangContext, Link } from "/lib"
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
    let { locale } = useRouter()
    let lang = LangContext(locale)
    useEffect(() => {
        let res = localStorage?.getItem('tires')
        // res to json
        let tires = res ? JSON.parse(res) : {}
        console.log(tires);
        // setData(tires)
    })
    const columns = [
        { title: lang.brand, dataIndex: 'brand', editable: true },
        { title: lang.model, dataIndex: 'model', editable: true },
        {
            title: lang.category, dataIndex: 'category', width: '300px',
            render: (_, record) => record.category.length >= 1 ? (
                <div className="box row">
                    {record.category.map((item, i) => (
                        <p className='ui' href={`/tires/${record.id}`} key={i} passHref> {item} </p>
                    ))}
                </div>
            ) : ''
        },
        { title: lang.width, dataIndex: 'width', width: '100px' },
        { title: lang.aspect, dataIndex: 'aspect', width: '100px' },
        { title: lang.rim, dataIndex: 'rim', width: '100px' },
        {
            title: '', dataIndex: '', width: '100px',
            render: (_, record) => data.length >= 1 ? (
                <div className="box row" >
                    <div style={{ margin: '0 10px' }} onClick={() => this.setState({ one: record, editable: true })}>
                        <PencilOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                    </div>
                    <Popconfirm title={lang.sure_to_delete} onConfirm={() => this.DeleteOne(record)}>
                        <TrashOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                    </Popconfirm>
                </div>
            ) : null, // 
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
let tires = [
    {
        "width": "67",
        "aspect": "76",
        "rim": "56",
        "brand": "dfg",
        "model": "rttry",
        "location": "rty",
        "private": "rty",
        "public": "rtyrtyhgf",
        "category": ["dfhfgdh", "hgjtuj"],
        "cost": "6",
        "wholesale": "56",
        "retail": "65",
        "tread": "456",
        "stockQty": "45",
        "speed": "456",
        "icon": "C:\\fakepath\\2381638.png",
        "images": []
    }
]