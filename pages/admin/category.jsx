
import { Input } from "/lib";
import {Link} from  
 "/lib";
import Head from "next/head";
import cookie from "cookie";
import ListsCategory from "/Component/lists/category";
import { useState } from "react";

export default function Admin({ categories }) {


    return (
        <div className="box w-full alignX">
            <Head>
                <title>admin</title>
            </Head>

            <Table data={categories} />
        </div>
    )
}
function Table({ data }) {
    if (data?.length > 0) {
        return (
            <div className="box col w-full ui  ">
                <ListsCategory data={{ name: 'name', slug: 'slug' }} classNames='color-ui' />
                {categories.map(a => <ListsCategory data={a} key={a.id} />)}
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