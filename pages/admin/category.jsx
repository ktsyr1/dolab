
import { Input } from "lib/micro";
import Link from "lib/link";
import Head from "next/head";
import cookie from "cookie";
import ListsCategory from "Component/lists/category";
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
    { _id: 1, name: 'New', slug: 'new' },
    { _id: 2, name: 'Used', slug: 'used' },
    { _id: 3, name: 'All Season', slug: 'all-season' },
    { _id: 4, name: 'Mudder', slug: 'mudder' },
    { _id: 5, name: 'Tires', slug: 'tires' },
    { _id: 6, name: 'Appointments', slug: 'appointments' },
    { _id: 7, name: 'Users', slug: 'users' },
    { _id: 8, name: 'Category', slug: 'category' },
    { _id: 9, name: 'Brinds', slug: 'brinds' },
    { _id: 1, name: 'New', slug: 'new' },
    { _id: 2, name: 'Used', slug: 'used' },
    { _id: 3, name: 'All Season', slug: 'all-season' },
    { _id: 4, name: 'Mudder', slug: 'mudder' },
    { _id: 5, name: 'Tires', slug: 'tires' },
    { _id: 6, name: 'Appointments', slug: 'appointments' },
    { _id: 7, name: 'Users', slug: 'users' },
    { _id: 8, name: 'Category', slug: 'category' },
    { _id: 9, name: 'Brinds', slug: 'brinds' },

] 