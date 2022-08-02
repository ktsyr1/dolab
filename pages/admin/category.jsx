
import { Input } from "/lib";
import { Link } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import ListsCategory from "/Component/lists/category";
import Forms from "/Component/theme/forms";
import { useState } from "react";

export default function Admin({ categories }) {

    function open() {
        document.getElementById('froms').classList.toggle('none');
    }
    return (
        <div className="box col w-full  ">
            <Head>
                <title>categories</title>
            </Head>
            <div className="box row ui alignY">
                <h1 className="m">categories</h1>
                <button className="btn ui" onClick={open}>add cat</button>
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
function Form({ open, mod }) {
    return (
        <div id="froms" className={"box col ui none pup " + (mod || '')} style={{ top: '90px' }}>
            <h2 className="box alignY">add category</h2>
            <Input type="text" name="name" placeholder="name" title={'name'} w />
            <Input type="text" name="slug" placeholder="slug" title={'slug'} />
            <button className="btn ui" onClick={open}>add</button>
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
                    function onDelete() {
                        // delete id from data
                        let newData = _data.filter(item => item.id !== a.id);
                        console.log(newData);
                        setData(newData);
                    }
                    function onEdit() {
                        // edit id from data
                    }
                    return < ListsCategory data={a} key={a.id} onDelete={onDelete} onEdit={onEdit} />
                })}
            </div>
        )
    } else {
        return <div className="box alignX"> not data </div>
    }
}
export async function getServerSideProps({ req }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin', permanent: true } }
    else return { props: { categories } }
}
let categories = [
    { id: 1, name: 'New', slug: 'new' },
    { id: 2, name: 'Used', slug: 'used' },
    { id: 3, name: 'All Season', slug: 'all-season' },
    { id: 4, name: 'Mudder', slug: 'mudder' },
    { id: 5, name: 'Tires', slug: 'tires' },
    { id: 6, name: 'Appointments', slug: 'appointments' },
    { id: 7, name: 'Users', slug: 'users' },
    { id: 8, name: 'Category', slug: 'category' },
    { id: 9, name: 'Brinds', slug: 'brinds' },
    { id: 11, name: 'New', slug: 'new' },
    { id: 12, name: 'Used', slug: 'used' },
    { id: 13, name: 'All Season', slug: 'all-season' },
    { id: 14, name: 'Mudder', slug: 'mudder' },
    { id: 15, name: 'Tires', slug: 'tires' },
    { id: 16, name: 'Appointments', slug: 'appointments' },
    { id: 17, name: 'Users', slug: 'users' },
    { id: 18, name: 'Category', slug: 'category' },
    { id: 19, name: 'Brinds', slug: 'brinds' },

] 