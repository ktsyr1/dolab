import Head from "next/head";
import { useRouter } from "next/router";
import { LangContext } from "../lib";

export default function Table({ head }) {
    let { locale } = useRouter();
    let lang = LangContext(locale);
    return (
        <table className="ui">
            <thead>
                <tr>
                    {head?.map(item => <th>{lang[item]} </th>)}
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}