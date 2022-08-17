
import { LangContext, Title } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms, { Input } from "/theme/forms";
import { AddCircleOutline, RemoveCircleOutline, PulseOutline, TrashOutline, PencilOutline } from "react-ionicons";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
// import Table, { TableRow } from "../../theme/tables";
import { Popconfirm, Table, Tag } from 'antd';
import 'antd/dist/antd.css'
export default function Maker() {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [data, setData] = useState(ArrayMaker);
    // one 
    let [id, setId] = useState(data.length);
    let [one, setOne] = useState({ name: '', models: [{ model: "", versions: [], id }] });
    function DeleteOne(e) {
        let id = e.id;
        let result = data.filter(item => item.id != id);
        setData(result);
    }
    function EditOne(e) {
        console.log(e);
        setOne(e);
    }
    const columns = [
        { title: lang.name, dataIndex: 'name', editable: true },
        {
            title: '', dataIndex: '',
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
    const expandedRowRender = (e) => {
        const columns = [
            { title: lang.model, dataIndex: 'model', key: 'model', },
            { title: lang.versions, dataIndex: 'versions', key: 'versions', },
        ];

        return <Table columns={columns} dataSource={e.models} pagination={false} />;
    };
    function send(res) {
        res['id'] = id + 1;
        res['key'] = id + 1;
        setData([...data, res])
        setId(id + 1)
    }
    return (
        <div className="box col w-full">
            <Head>
                <title>{lang?.maker}</title>
            </Head>
            <Title title={lang?.maker} ui />
            <Form onSubmit={send} data={one} />
            <div className="m  ">
                <Table
                    dataSource={data}
                    columns={columns}
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ['0'],
                    }}
                    pagination={false}
                    bordered

                />
            </div>
        </div>
    );
}
function Form({ onSubmit, data }) {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [id, setId] = useState(0);
    let [models, setModels] = useState(data.models);
    // set name
    let [name, setName] = useState(data.name);
    console.log({ models, data });
    // loop ModelsCount
    let Models = () => models.map((model, i) => {
        let { id, versions } = model
        // remove item in models
        function remove() {
            let datas = models.filter(item => item.id != id);
            setModels(datas);
        }
        function update(e) {
            // update model
            let dataOthers = models.filter((item) => item.id != id);
            let dataOne = models.filter(item => item.id === id)[0]
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
                <Input name="versions" title={lang.version} onChange={update} defaultValue={versions?.join(',')} />
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
            <Input name='name' placeholder={lang.name} onChange={e => setName(e.target.value)} className='w-10' defaultValue={name} />
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
// create class from  
// critical thinking
let ArrayMaker = [
    {
        id: 1,
        key: 1,
        name: "test 1",
        models: [
            { model: "sdda", versions: ["v1", 'v2', 'v3'] },
            { model: "sad", versions: ["v1", 'v2'] },
        ],
    },

]
class Form2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: 0,
            name: this.props.name,
            models: this.props.models
        }
        this.Add = this.Add.bind(this)
        this.New = this.New.bind(this)
    }
    New() { this.setState({ models: [...this.state.models, { model: "", versions: [], id: this.state._id + 1 }] }) }
    Add() { this.props.onSubmit(this.state) }
    // function Form3({ onSubmit, data }) {
    // let { locale } = useRouter();
    // let lang = LangContext(locale);   

    Models() {
        return models.map((model, i) => {
            let { id, versions } = model
            // remove item in models
            function remove() {
                let datas = models.filter(item => item.id != id);
                this.setState({ models: datas });
            }
            function update(e) {
                // update model
                let dataOthers = models.filter((item) => item.id != id);
                let dataOne = models.filter(item => item.id === id)[0]
                let name = e.target.name;
                let value = e.target.value;

                dataOne[name] = name === 'versions' ? value.split(',') : value;
                // dataOthers.push(dataOne)  
                this.setState({ models: [...dataOthers, dataOne] });

            }
            return (
                <div className="box row alignY " key={i} >
                    {i > 0
                        ? <RemoveCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" onClick={remove} />
                        : ''
                    }
                    <Input name="model" onChange={update} defaultValue={model.model} />
                    <Input name="versions" title={lang.version} onChange={update} defaultValue={versions?.join(',')} />
                </div>
            )
        })
    }
    render() {
        console.log(this);
        let lang = LangContext(this.props.locale);
        return (
            <div className="box col ui" >
                <Input name='name' placeholder={lang.name} onChange={e => this.setState({ name: e.target.value })} className='w-10' defaultValue={this.state.name} />
                {this.Models}

                <div className="box row alignX-full ">
                    <div className="box row alignY ui " onClick={this.New} style={{ cursor: 'pointer', margin: '0 10px', padding: 0 }}>
                        <AddCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" />
                        <p style={{ margin: '0 10px' }}>add new model</p>
                    </div>
                    <button className="btn w-8 alignX" onClick={this.Add}>{lang.add}</button>
                </div>
            </div>
        )
    }
}
withRouter(Form2);