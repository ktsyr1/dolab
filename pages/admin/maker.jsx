
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

export default class Maker extends Component {
    constructor(props) {
        super(props);
        let lang = LangContext(this.props.locale)
        let data = ArrayMaker
        const columns = [
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
        ];
        let oneDefaults = { name: '', models: [{ model: "", versions: [], id: 0 }] }
        this.state = {
            oneDefaults,
            one: oneDefaults,
            maker_id: data.length,
            model_id: 0,
            data,
            columns,
            lang,
            editable: false,
        }
        this.send = this.send.bind(this);
        this.DeleteOne = this.DeleteOne.bind(this);
        this.EditOne = this.EditOne.bind(this);
        this.expandedRowRender = this.expandedRowRender.bind(this);
        this.New = this.New.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    send() {
        let { one, data } = this.state
        one['id'] = this.state.maker_id + 1
        one['key'] = this.state.maker_id + 1
        one['name'] = document.querySelector('body [name]').value
        // let ids = data.filter(a => a.id === one.id)
        this.setState({
            data: [...this.state.data, one], maker_id: one.id,
            one: { name: '', models: [{ model: "", versions: [] }] }, editable: false
        })
        // Array.from(document.querySelectorAll('body [name]')).map(item => item.value = '')
    }
    updateOne(e) {
        let { one, data } = this.state
        data = data.map(item => {
            if (item.id == one.id) {
                one['name'] = document.querySelector('body [name]').value
                return one
            }
            else return item
        })
        this.setState({
            data, editable: false,
            one: this.state.oneDefaults
        })
    }
    DeleteOne(e) {
        let result = this.state.data.filter(item => item.id != e.id);
        this.setState({ data: result })
    }
    EditOne(e) {
        // bug fix [name , models.versions , models.model]
        // document.querySelector('body [name="name"]').value = e.name
        // document.querySelector('body [name="models.versions"]').value = e.models[0].versions.join(' , ')
        // document.querySelector('body [name="models.model"]').value = e.models[0].model
        this.setState({ one: e, editable: true })
    }
    expandedRowRender(e) {
        const columns = [
            { title: this.state.lang.model, dataIndex: 'model', key: 'model', },
            { title: this.state.lang.versions, dataIndex: 'versions', key: 'versions', render: e => e.join(' , ') }
        ]
        return <Table columns={columns} dataSource={e.models} pagination={false} />;
    }

    New() {
        // new models 
        let one = this.state.one;
        one.models?.push({ model: "", versions: [], id: this.state.model_id + 1 })
        this.setState({ one, model_id: this.state.model_id + 1 })
    }

    remove(id) {
        let one = this.state.one;
        let data = one.models.filter(item => item.id != id);
        this.setState({ one: { ...one, models: data } })
    }

    update(e, id) {
        // update model
        let { models } = this.state.one

        let dataOthers = models.filter((item) => item.id != id);
        let dataOne = models.filter(item => item.id === id)[0]
        let name = e.target.name;
        let value = e.target.value;

        dataOne[name] = name === 'versions' ? value.split(',') : value;
        console.log(dataOne)
        this.setState({ one: { ...this.state.one, models: [...dataOthers, dataOne] } })

    }
    render() {

        let { lang, data } = this.state
        let one = this.state && this.state?.one

        let typeSend = this.state.editable
            ? { text: lang.update, submit: this.updateOne, }
            : { text: lang.add, submit: this.send, }
        console.log(this.state);
        console.log(one && one.name);
        return (
            <div className="box col w-full">
                <Head>
                    <title>{lang?.maker}</title>
                </Head>
                {/* <Title title={lang?.maker} ui /> */}
                {/* <Form onSubmit={this.send} data={this.state?.one} /> */}
                <div className="box col ui">
                    <Input name='name' placeholder={lang.name} className='w-10'
                        defaultValue={one && one.name}
                        onChange={e => this.setState({ one: { name: e.target.value, ...one } })}
                    />
                    {/* <Models /> */}
                    {this.state.one?.models?.map((model, i) => {
                        let { id, versions } = model
                        // remove item in models  
                        return (
                            <div className="box row alignY " key={i} >
                                {this.state.one?.models.length > 1
                                    ? <RemoveCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" onClick={() => this.remove(id)} />
                                    : ''
                                }
                                <Input name="model" onChange={e => this.update(e, id)} defaultValue={model.model} />
                                <Input name="versions" title={lang.version} onChange={e => this.update(e, id)} defaultValue={versions?.join(',')} />
                            </div>
                        )
                    })}
                    <div className="box row alignX-full ">
                        <div className="box row alignY ui " onClick={this.New} style={{ cursor: 'pointer', margin: '0 10px', padding: 0 }}>
                            <AddCircleOutline title={'Plus'} color={'#00000'} height="40px" width="40px" />
                            <p style={{ margin: '0 10px' }}>add new model</p>
                        </div>
                        <button className="btn w-8 alignX" onClick={typeSend.submit}> {typeSend.text} </button>
                    </div>
                </div>
                <div className="m  ">
                    <Table
                        dataSource={this.state.data}
                        columns={this.state.columns}
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
// critical thinking
let ArrayMaker = [
    {
        id: 1,
        key: 1,
        name: "BMW",
        models: [
            { model: "X4", versions: ["2019", "2020"] },
            { model: "X5", versions: ['2021', '2022'] },
        ],
    },

]

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/maker', permanent: true } }
    else return { props: { ArrayMaker, Text: Text[locale.slice(0, 2)] } }
}