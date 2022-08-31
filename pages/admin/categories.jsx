

import { Input } from "/theme/forms";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms from "/theme/forms";
import BrandContext from "/lib/context/brand";
import { PencilOutline, TrashOutline } from "react-ionicons";
import { LangContext, Title } from "/lib";
import { Popconfirm, Table } from 'antd';
import 'antd/dist/antd.css'

// nextjs useing routes 

export default class BrandsPage extends Component {
    constructor(props) {
        super(props);
        let data = props.categories
        let lang = LangContext(this.props.locale)
        let _id = data.length
        this.state = {
            data,
            one: { name: '', id: _id },
            lang: props.Text,
            edittype: false,
            _id
        };
        this.updateOne = this.updateOne.bind(this);
        this.send = this.send.bind(this);
        this.DeleteOne = this.DeleteOne.bind(this);

    }
    updateOne(newData) {
        let { data, one, _id } = this.state
        let All = data.filter(item => item.id != one.id)
        let All_one = one
        data = [All_one, ...All]
        data = data.sort((a, b) => a.id - b.id)
        this.setState({ data, one: { name: '', id: _id }, edittype: false })
    }
    send(e) {
        let { data, one, _id } = this.state
        one['id'] = _id + 1
        document.querySelector('body [name="name"] ').value = ''
        this.setState({ data: [one, ...data], _id: _id + 1, one: { name: '' } })
    }
    DeleteOne(record) {
        let { data } = this.state
        data = data.filter(item => item.id !== record.id)
        this.setState({ data })
    }
    render() {
        let { lang, edittype, one } = this.state

        let typeSend = edittype
            ? { text: lang.update, submit: this.updateOne, }
            : { text: lang.add, submit: this.send, }
        return (
            <div className="box col w-full  ">
                <Head>
                    <title>{lang.categories}</title>
                </Head>
                <Title title={lang.categories} ui />
                {/* Forms */}
                <div className='box row alignY-end alignY-start ui' >
                    <Input type="text" name="name" placeholder={lang.name} title={lang.name}
                        onChange={e => this.setState({ one: { ...this.state.one, name: e.target.value } })}
                        value={one && one.name}
                    />
                    <button className="btn " style={{ marginBottom: '12px' }} onClick={typeSend.submit} >{typeSend.text}</button>
                </div>

                <Table
                    dataSource={this.state.data}
                    columns={[
                        { title: lang.name, dataIndex: 'name', editable: true },
                        {
                            title: '', dataIndex: '',
                            render: (_, record) => this.state.data.length >= 1 ? (
                                <div className="box row" >
                                    <div style={{ margin: '0 10px' }} onClick={() => this.setState({ one: record, edittype: true })}>
                                        <PencilOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                                    </div>
                                    <Popconfirm title={lang.sure_to_delete} onConfirm={() => this.DeleteOne(record)}>
                                        <TrashOutline title={'Delete'} color={'#00000'} height="25px" width="25px" />
                                    </Popconfirm>
                                </div>
                            ) : null
                        },
                    ]}
                    pagination={false}
                    bordered
                />
            </div>
        )
    }
}
BrandsPage.contextType = BrandContext;

export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/brands', permanent: true } }
    else return { props: { categories, Text: Text[locale.slice(0, 2)] } }
}

let categories = [
    { id: 1, name: 'New' },
    { id: 2, name: 'Used' },
    { id: 3, name: 'All Season' },
    { id: 4, name: 'Mudder' },
    { id: 5, name: 'Tires' },
    { id: 6, name: 'Appointments' },
    { id: 7, name: 'Users' },
    { id: 8, name: 'Category', },
    { id: 9, name: 'Brands' },
    { id: 10, name: 'Products' },
    // { id: 11, name: 'New' },
    // { id: 12, name: 'Used' },
    // { id: 13, name: 'All Season' },
    // { id: 14, name: 'Mudder' },
    // { id: 15, name: 'Tires' },
    // { id: 16, name: 'Appointments' },
    // { id: 17, name: 'Users' },
    // { id: 18, name: 'Category', },
    // { id: 19, name: 'Brands' },
    // { id: 20, name: 'Products' },
] 