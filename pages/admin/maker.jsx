
import { LangContext, Title } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms, { Input } from "/theme/forms";
import { AddCircleOutline, RemoveCircleOutline, PulseOutline, TrashOutline, PencilOutline } from "react-ionicons";
import axios from "axios";
import { useRouter } from "next/router";
// import Table, { TableRow } from "../../theme/tables";
import { Popconfirm, Table, Tag } from 'antd';
import 'antd/dist/antd.css'
export default function Maker() {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [data, setData] = useState(ArrayMaker);
    // one 
    let [one, setOne] = useState({ name: '', models: [{ model: "", versions: [], id }] });
    function DeleteOne(e) {
        let id = e.id;
        let result = data.filter(item => item.id != id);
        setData(result);
    }
    let [id, setId] = useState(data.length);
    function EditOne(e) {
        console.log(e);
    }
    const columns = [
        { title: lang.name, dataIndex: 'name', key: 'name', },
        { title: lang.model, dataIndex: 'model', key: 'model', },
        { title: lang.versions, dataIndex: 'versions', key: 'versions', },
        {
            title: '', dataIndex: '', key: 'x',
            render: (_, record) => data.length >= 1 ? (
                <div className="box row" >
                    <div style={{ margin: '0 10px' }} onClick={() => EditOne(record)}>
                        <PencilOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                    </div>
                    <Popconfirm title={lang.sure_to_delete} onConfirm={() => DeleteOne(record)}>
                        <TrashOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                    </Popconfirm>
                </div>
            ) : null, // 
        },
    ];
    function send(res) {
        res['id'] = id + 1;
        setData([...data, res])
        setId(id + 1)
    }
    return (
        <div className="box col w-full">
            <Head>
                <title>{lang?.maker}</title>
            </Head>
            <Title title={lang?.maker} ui />
            <Form onSubmit={send} />
            <div className="m">
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </div>
    );
}
function Form({ onSubmit }) {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [id, setId] = useState(0);
    let [models, setModels] = useState([{ model: "", versions: [], id }]);
    // set name
    let [name, setName] = useState("");

    // loop ModelsCount
    let Models = () => models.map((model, i) => {
        // remove item in models
        function remove() {
            let datas = [...models];
            datas.splice(i, 1);
            setModels(datas);
        }
        function update(e) {
            // update model
            let dataOthers = models.filter((item) => item.id != model.id);
            let dataOne = models.filter(item => item.id === model.id)[0]
            let name = e.target.name;
            let value = e.target.value;

            dataOne[name] = name === 'versions' ? value.split(',') : value;
            // dataOthers.push(dataOne)  
            setModels([...dataOthers, dataOne]);

        }
        return (
            <div className="box row alignY " key={i} >
                {i > 0
                    ? <RemoveCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" onClick={remove} />
                    : ''
                }
                <Input name="model" onChange={update} defaultValue={model.model} />
                <Input name="versions" title={lang.version} onChange={update} defaultValue={model.versions?.join(',')} />
            </div>
        )
    })

    let New = () => {
        setModels([...models, { model: "", versions: [], id }])
        setId(id + 1)
    }


    function Add() {
        onSubmit({ name, models })
    }

    return (
        <div className="box col ui">
            <Input name='name' placeholder={lang.name} onChange={e => setName(e.target.value)} className='w-10' />
            <Models />

            <div className="box row alignX-full ">
                <div className="box row alignY ui " onClick={New} style={{ cursor: 'pointer', margin: '0 10px', padding: 0 }}>
                    <AddCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" />
                    <p style={{ margin: '0 10px' }}>add new model</p>
                </div>
                <button className="btn w-8 alignX" onClick={Add}>{lang.add}</button>
            </div>
        </div>
    )
}
// critical thinking
let ArrayMaker = [
    {
        id: 1,
        name: "asgf",
        models: [{ model: "wq", versions: ["v1"] }],
    },
    {
        id: 2,
        name: "werre we ree",
        models: [
            { model: "sdda", versions: ["v1", 'v2', 'v3'] },
            { model: "sad", versions: ["v1", 'v2'] },
        ],
    },

]
