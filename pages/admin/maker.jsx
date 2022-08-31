
import { LangContext, Title } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms, { Input } from "/theme/forms";
import { AddCircleOutline, RemoveCircleOutline, PulseOutline, TrashOutline, PencilOutline } from "react-ionicons";
import { Popconfirm, Table } from 'antd';
import 'antd/dist/antd.css'
import { NewID } from "../../lib";

export default class Maker extends Component {
    constructor(props) {
        super(props);
        let lang = LangContext(this.props.locale)
        let data = ArrayMaker
        let oneDefaults = { name: '', models: [{ model: "", versions: [], id: 0 }] }
        this.state = {
            oneDefaults,
            one: { models: [{ id: 1 }] },
            model_id: 0,
            data,
            lang,
            editable: false,
        }
        this.New = this.New.bind(this);
        this.send = this.send.bind(this);
        this.Change = this.Change.bind(this);

        this.DeleteOne = this.DeleteOne.bind(this);
        this.expandedRowRender = this.expandedRowRender.bind(this);
        this.updateOne = this.updateOne.bind(this);
        /**
         * @return [ New, send, updateOne, deleteOne]
         *  ]
         *  */
    }

    New() {
        // new models 
        let one = this.state.one;
        let id = NewID(one.models)
        one.models?.push({ model: "", versions: [], id })
        this.setState({ one })
    }
    send() {
        let { one, data } = this.state

        one['id'] = NewID(data)
        one['key'] = one.id
        one['name'] = document.querySelector('body [name]').value
        // let ids = data.filter(a => a.id === one.id)
        this.setState({
            data: [...data, one],
            one: { name: '', models: [{ model: "", versions: [] }] }, editable: false
        })
        // Array.from(document.querySelectorAll('body [name]')).map(item => item.value = '')
    }
    DeleteOne(e) {
        let result = this.state.data.filter(item => item.id != e.id);
        this.setState({ data: result })
    }
    expandedRowRender(e) {
        const columns = [
            { title: this.state.lang.model, dataIndex: 'model', key: 'model', },
            { title: this.state.lang.versions, dataIndex: 'versions', key: 'versions', render: e => e?.join(' , ') }
        ]
        return <Table columns={columns} dataSource={e.models} pagination={false} />;
    }

    updateOne(e) {
        let { one, data } = this.state
        data = data.map(item => {
            if (item.id == one.id) {
                // one['name'] = document.querySelector('body [name]').value
                return one
            }
            else return item
        })
        this.setState({
            data, editable: false,
            one: this.state.oneDefaults
        })
    }
    Change(e, id) {
        let { name, value } = e.target
        let { one } = this.state
        if (name == 'name') this.setState({ one: { ...one, name: value } })
        else {
            let { models } = one

            let dataOthers = models.filter((item) => item.id != id);
            let dataOne = models.filter(item => item.id === id)[0]

            dataOne[name] = name === 'versions' ? value.split(',') : value; 
            models = [...dataOthers, dataOne]
            models = models.sort((a, b) => a.id - b.id)
            this.setState({ one: { ...this.state.one, models } })
        }
        // console.log(this.state.one);
    }
    render() {

        let { lang, data, one, editable } = this.state
        let typeSend = editable
            ? { text: lang.update, submit: this.updateOne, }
            : { text: lang.add, submit: this.send, }
        return (
            <div className="box col w-full">
                <Head>
                    <title>{lang?.maker}</title>
                </Head>
                <Title title={lang?.maker} ui />
                <div className="box col ui">
                    <Input name='name' placeholder={lang.name} className='w-10'
                        value={one.name} onChange={e => this.Change(e)}
                    />
                    {/* <Models /> */}
                    {one?.models?.map((model, i) => {
                        let { id, versions, model } = model
                        // remove item in models
                        return (
                            <div className="box row alignY " key={i} >
                                <Input name="model" onChange={e => this.Change(e, id)} value={model} />
                                <Input name="versions" title={lang.version} onChange={e => this.Change(e, id)} value={versions?.join(',')} />
                                {one?.models.length > 1
                                    ? <div style={{ marginTop: '30px' }}>
                                        <RemoveCircleOutline
                                            title={'Plus'}
                                            color={'#00000'}
                                            height="40px"
                                            width="40px"
                                            onClick={() => {
                                                let one = this.state.one;
                                                let data = one.models.filter(item => item.id != id);
                                                this.setState({ one: { ...one, models: data } })
                                            }} /></div>
                                    : ''}
                            </div>
                        )
                    })}
                    <div className="box row alignX-full m">
                        <div className="box row alignY ui " onClick={this.New} style={{ cursor: 'pointer', margin: '0 10px', padding: 0 }}>
                            <AddCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" />
                            <p style={{ margin: '0 10px' }}>Add new model</p>
                        </div>
                        <button className="btn w-8 alignX" onClick={typeSend.submit}> {typeSend.text} </button>
                    </div>
                </div>
                <div className="m  ">
                    <Table
                        dataSource={this.state.data}
                        columns={[
                            { title: lang.name, dataIndex: 'name', editable: true },
                            {
                                title: '', dataIndex: '',
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
                        ]}
                        expandable={{
                            expandedRowRender: this.expandedRowRender,
                            defaultExpandedRowKeys: ['0'],
                        }}
                        pagination={false}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

// create class from   
let ArrayMaker = [
    {
        id: 1,
        key: 1,
        name: "BMW",
        models: [
            { id: 1, model: "X4", versions: ["2019", "2020"] },
            { id: 2, model: "X5", versions: ['2021', '2022'] },
        ],
    },
    {
        "id": 2,
        "key": 2,
        "name": "jeep",
        "models": [
            { id: 1, model: "X2", versions: ['2000'] }
        ]

    }
]

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/maker', permanent: true } }
    else return { props: { ArrayMaker, Text: Text[locale.slice(0, 2)] } }
}