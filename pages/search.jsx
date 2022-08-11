import Head from "next/head";
import { LangContext } from "/lib";
export default function Search() {
    let lang = LangContext()

    return (
        <div className="box  alignX  w-full  ">
            <Head>
                <title>search</title>
            </Head>
            {/* <Title title='search' ui /> */}
            <div className="box alignY alignX h-10 ui w-10  ">
                {lang.under_development}
            </div>
        </div>
    )
}