
import { LangContext, Title, Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms from "/theme/forms";
import { PencilOutline, TrashOutline } from "react-ionicons";
import axios from "axios";
import { useRouter } from "next/router";
import Table, { TableRow } from "../../theme/tables";

export default function Maker() {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    let [data, setData] = useState({ name: "", model: "", versions: [] });
    function Changes(e) {
        let datas = { ...data };
        datas[e.target.name] = e.target.value;
        setData(datas);
    }
    console.log(data);
    return (
        <div className="box col w-full">
            <Head>
                <title>{lang?.maker}</title>
            </Head>
            <Title title={lang?.maker} ui />
            <div className="box row alignY ui">
                <Input name='name' placeholder={lang.name} onChange={Changes} />
                <Input name="model" onChange={Changes} />
                <Input name="versions" title={lang.version} />
                <button className="btn h-6 alignX">{lang.add}</button>
            </div>
            <Table head={['name', 'model', "versions"]}>
                {ArrayMaker.map(item => {
                    let data = [item.name, item.models[0].model, item.models[0].versions];
                    return (
                        <TableRow data={item} />
                    )
                })}

            </Table>
        </div>
    );
}
// critical thinking
let ArrayMaker = [
    {
        name: "asgf",
        models: [{ model: "wq", versions: ["v1"] }],
    },
    {
        name: "werre we ree",
        models: [{ model: "sad", versions: ["v1", 'v2'] }],
    },

]
