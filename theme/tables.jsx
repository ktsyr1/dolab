import Head from "next/head";
import { useRouter } from "next/router";
import { PencilOutline, TrashOutline } from "react-ionicons";
import { LangContext } from "../lib";

export default function Table({ head, rows, schema, className, style, ...props }) {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    style = {
        thead: {
            textAlign: 'start'
        }
    }
    return (
        <table className="ui">
            <tr>
                {head?.map(item => <th>{lang[item]} </th>)}
            </tr>
            {props.children}
        </table>
    )
}
export function TableRow({ data, json, ...props }) {
    return (
        <tr dataJson={JSON.stringify(json)} n>
            {data.map(item => <td>{item}</td>)}
            <td>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {props.edit ? <PencilOutline width={'20px'} height={'20px'} /> : ''}
                    {props.delete ? <TrashOutline width={'20px'} height={'20px'} /> : ''}
                </div>
            </td>
        </tr>
    )
}