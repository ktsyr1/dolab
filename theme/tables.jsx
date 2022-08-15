import Head from "next/head";
import { useRouter } from "next/router";
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
            <thead style={style.thead}>
                <tr>
                    {head?.map(item => <th>{lang[item]} </th>)}
                </tr>
            </thead>
            <tbody style={{ display: 'inline-grid', width: '-webkit-fill-available' }} >
                {rows?.map(row => (
                    <tr dataJson={JSON.stringify(row)} className='p-2 w-full'>
                        {schema.map(item => <td>{row[item]}</td>)}
                        <hr />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export function TableRow({ data }) {
    return (
        <tr>
            <tr dataJson={JSON.stringify(data)} className='p-2 w-full'>
                {data.map(item => <td>{item}</td>)}
            </tr>
            <hr />
        </tr>
    )
}