

import Links from 'next/link'
import { useRouter } from 'next/router'
import lang_data from '/lib/lang.json'

export default function defaults() {
    return <div className='box col m-2'> test </div>
}
export function Input(props) {
    return (
        <div className='box col m-2'>
            <p>{props.title}</p>
            <input type={props.type ? props.type : 'text'} {...props} />
        </div>
    )
}
export function Link({ href, children, className, style }) {
    return (
        <Links href={href || "#"} lang='en' >
            <a className={className || ''} style={style}>
                {children}
            </a>
        </Links>
    )
}

export function Title(props) {

    let { title, close, className, style, btns, btn, tag, ui, border } = props
    return (
        <div className={`Title box row alignY ${className ? className : ''} ${ui ? 'ui' : ''} `} style={style}>
            {title ? <h1 className='m'>{title}</h1> : ""}
            <div className="box R row center-full" >
                {props.children}
            </div>
        </div>
    );
}
export async function LangContext(locale = 'en') {
    return lang_data[locale]
}