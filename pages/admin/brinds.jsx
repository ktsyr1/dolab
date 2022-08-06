

import { Input } from "/lib";
import Head from "next/head";
import cookie from "cookie";
import { Component, useContext, useState } from "react";
import Forms from "/Component/theme/forms";
import BrindContext from "/Component/context/brind";
import { PencilOutline, TrashOutline } from "react-ionicons";
// nextjs useing routes 

export default class BrindsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.brinds,
            One: null,
            title: 'add brind',
            Text: props.Text,
        };
    }
    render() {
        console.log(this)
        // let update = (newData) => this.setState({ data: newData })
        let updateOne = (newData) => { this.setState({ One: newData }); console.log(newData) }
        let { Text } = this.state
        console.log(Text)
        let name = this.state?.One?.name
        return (
            <BrindContext.Provider value={this.state}>
                <div className="box col w-full  ">
                    <Head>
                        <title>{Text.brinds}</title>
                    </Head>
                    <div className="box row ui alignY">
                        <h1 className="m">{Text.brinds}</h1>
                        <button className="btn " onClick={this.context.open}>{Text.add_brind}</button>
                    </div>
                    <Forms title={Text.add_brind}  >
                        <Input type="text" name="name" placeholder={Text.name} title={Text.name} />
                    </Forms>
                    <Forms classes='FormEdit' title={Text.edit_brind} >
                        <Input type="text" name="name" placeholder={Text.name} title={Text.name} defaultValue={name} />
                    </Forms>
                    <Table data={this.state.data} updateOne={updateOne} />
                </div>
            </BrindContext.Provider >
        );
    }
}
BrindsPage.contextType = BrindContext;


export function List({ data, classNames, onDelete, onEdit }) {
    let { name } = data
    return (
        <>
            <div className={"box row w-full alignY alignX-full " + classNames}>
                <p className="w-10 p "  >{name}</p>
                <div className="box rew ">
                    {onDelete ?
                        <div className="m" onClick={onDelete}>
                            <TrashOutline width={'20px'} height={'20px'} />
                        </div>
                        : ""}
                    {onEdit ?
                        <div className="m" onClick={onEdit}>
                            <PencilOutline width={'20px'} height={'20px'} />
                        </div>
                        : "-"}
                </div>
            </div>
            <hr />
        </>
    )
}
function Table({ updateOne, open }) {
    let Context = useContext(BrindContext);
    let [_data, setData] = useState(Context.data);
    let [One, setOne] = useState(null)
    if (_data?.length > 0) {
        // onDelete, onEdit 
        let setDelete = () => document.querySelector('.VerifyDelete')?.classList.toggle('none')
        function onDelete() {
            // delete id from data
            let newData = _data.filter(item => item.id !== One.id);
            setData(newData);
            Context.setdata = newData;
            setDelete()
        }
        return (
            <div className="box col w-full ui  ">
                {One ? <VerifyDelete data={One} open={setDelete} Delete={onDelete} /> : ''}
                <List data={{ name: 'name' }} classNames='color-ui' />
                {_data.map(a => {

                    let onEdit = () => {
                        updateOne(a)
                        setTimeout(() => {
                            document.querySelector('.FormEdit')?.classList.toggle('none')
                        }, 500)
                    }
                    let Delete = () => {
                        if (One === null) {
                            setOne(a);
                            setTimeout(setDelete, 500)
                        }
                        setOne(a);
                        setDelete()
                    }
                    return <List data={a} key={a.id} onDelete={Delete} onEdit={onEdit} />
                })}
            </div >
        )
    } else {
        return <div className="box alignX ui"> not data </div>
    }
}
function VerifyDelete({ data, open, Delete }) {
    let { Text } = useContext(BrindContext)
    console.log(Text);
    return (
        <div className={'pup none forms m-auto box alignX alignY VerifyDelete '} style={{
            width: '100%', height: '100%', right: 0, top: 0
        }}>
            <div style={{ width: '100%', height: '100%', backdropFilter: 'blur(10px)' }} />

            <div id="forms" className=" box col ui pup m-auto" >
                <p className="m-auto p-5" >{Text?.delete_for_brind} <b>{data.name}</b> </p>
                <div className="box row">
                    <button className="btn w-full m diseble" onClick={open}>{Text?.close}</button>
                    <button className="btn w-full m" onClick={Delete}>{Text?.delete}</button>

                </div>
            </div>

        </div>
    )
}
export async function getServerSideProps({ req, locale }) {
    let cookies = cookie.parse(req?.headers?.cookie || '')
    let Text = await import('/lib/lang.json')
    if (!cookies?.token) return { redirect: { destination: '/auth/login?back=/admin/brinds', permanent: true } }
    else return { props: { brinds, Text: Text[locale.slice(0, 2)] } }
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