
import { Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import ListsCategory from "/Component/lists/category";
import { useState } from "react";

export default function Admin({ categories }) {

    function open() {
        document.getElementById('forms').classList.toggle('none');
    }
    return (
        <div className="box col w-full  ">
            <Head>
                <title>categories</title>
            </Head>
            <div className="box row ui alignY">
                <h1 className="m">categories</h1>
                <button className="btn" onClick={open}>add cat</button>
            </div>
            <Form open={open} />
            {/* <Form open={open} mod='edit' /> */}
            {/* <Forms open={open} mod='add' title='add category' >
                <Input name='name' label='name' />
                <Input name='slug' label='slug' />
            </Forms> */}
            <Table data={categories} />
        </div>
    )
}
function Form({ open, className, data = "" }) {
    return (
        <div id="forms" className={"box col ui none pup " + className} style={{ top: '90px' }}>
            <h2 className="box alignX m-5">add category</h2>
            <Input type="text" name="name" placeholder="name" title={'name'} defaultValue={data} />
            <button className="btn" onClick={open}>add</button>
        </div>
    )
}
function Table({ data }) {
    let [_data, setData] = useState(data);
    if (data?.length > 0) {
        // onDelete, onEdit

        return (
            <div className="box col w-full ui  ">
                <ListsCategory data={{ name: 'name', slug: 'slug' }} classNames='color-ui' />
                {_data.map(a => {
                    function setDelete() {
                        document.querySelector('.d' + a.id).classList.toggle('none')
                    }
                    function onDelete() {
                        // delete id from data
                        let newData = _data.filter(item => item.id !== a.id);
                        setData(newData);
                        setDelete()
                    }
                    function onEdit() {
                        // edit id from data
                        document.querySelector('.ed' + a.id).classList.toggle('none')

                    }
                    return (
                        <>
                            <VerifyDelete a={a} set={setDelete} on={onDelete} />
                            <Form data={a.name} className={'ed' + a.id} open={onEdit} />

                            <ListsCategory data={a} key={a.id} onDelete={setDelete} onEdit={onEdit} />
                        </>)
                })}
            </div >
        )
    } else {
        return <div className="box alignX ui"> not data </div>
    }
}
function VerifyDelete({ a, set, on }) {
    return (
        <div className={'pup none d' + a.id}>
            <div id="forms" className="box col ui" >
                <p style={{ margin: '10px 50px' }}>delete for cat <b>{a.name}</b> </p>
                <div className="box row">
                    <button className="btn w-full m diseble" onClick={set}>close</button>
                    <button className="btn w-full m" onClick={on}>Delete</button>

                </div>
            </div>

        </div>
    )
}
export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/category', permanent: true } }
    else return { props: { categories } }
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
    { id: 9, name: 'Brinds' },
    { id: 10, name: 'Products' },
    { id: 11, name: 'New' },
    { id: 12, name: 'Used' },
    { id: 13, name: 'All Season' },
    { id: 14, name: 'Mudder' },
    { id: 15, name: 'Tires' },
    { id: 16, name: 'Appointments' },
    { id: 17, name: 'Users' },
    { id: 18, name: 'Category', },
    { id: 19, name: 'Brinds' },
    { id: 20, name: 'Products' },
] 