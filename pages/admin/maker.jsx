
import { LangContext, Title, Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms from "/theme/forms";
import { PencilOutline, TrashOutline } from "react-ionicons";
import axios from "axios";
import { useRouter } from "next/router";
// import Table, { TableRow } from "../../theme/tables";
import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css'
export default function Maker() {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [data, setData] = useState({ name: "", model: "", versions: [] });
    function Changes(e) {
        let datas = { ...data };
        datas[e.target.name] = e.target.value;
        setData(datas);
    }
    const dataSource = [
        { id: '1', name: 'Mike', model: 32, address: '10 Downing Street', },
        { id: '2', name: 'John', model: 42, address: '10 Downing Street', },
    ];

    const columns = [
        { title: lang.name, dataIndex: 'name', key: 'name', },
        { title: lang.model, dataIndex: 'model', key: 'model', },
        { title: lang.versions, dataIndex: 'versions', key: 'models[0].model', },
        { title: 'versions', dataIndex: 'versions', key: 'versions', },
    ];

    console.log(data);

    return (
        <div className="box col w-full">
            <Head>
                <title>{lang?.maker}</title>
            </Head>
            <Title title={lang?.maker} ui />
            <div className="box row alignY ui">
                <Input name='name' placeholder={lang.name} onChange={Changes} />
                <Input name="model" onChange={Changes} />
                <Input name="versions" title={lang.version} />
                <button className="btn h-6 alignX">{lang.add}</button>
            </div>
            <div className="m">
                <Table dataSource={ArrayMaker} columns={columns} />
            </div>
        </div>
    );
}
// critical thinking
let ArrayMaker = [
    {
        name: "asgf",
        models: [{ model: "wq", versions: ["v1"] }],
    },
    {
        name: "werre we ree",
        models: [
            { model: "sdda", versions: ["v1", 'v2', 'v3'] },
            { model: "sad", versions: ["v1", 'v2'] },
        ],
    },

]
