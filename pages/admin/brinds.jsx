
import { Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import ListsCategory from "/Component/lists/category";
import { useState } from "react";

export default function Admin({ brinds }) {

    function open() {
        document.getElementById('forms').classList.toggle('none');
    }
    return (
        <div className="box col w-full  ">
            <Head>
                <title>brinds</title>
            </Head>
            <div className="box row ui alignY">
                <h1 className="m">brinds</h1>
                <button className="btn" onClick={open}>add cat</button>
            </div>
            <Form open={open} /> 
            <Table data={brinds} />
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
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/brinds', permanent: true } }
    else return { props: { brinds } }
}
let brinds = [
    { id: 1, name: 'BMW' },
    { id: 2, name: 'Audi' },
    { id: 3, name: 'Mercedes' },
    { id: 4, name: 'Ferrari' },
    { id: 5, name: 'Lamborghini' },
    { id: 6, name: 'Porsche' },
    { id: 7, name: 'Bugatti' },
    { id: 8, name: 'Koenigsegg' },
    { id: 9, name: 'Aston Martin' },
    { id: 10, name: 'Jaguar' },

] 