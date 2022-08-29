

import Links from 'next/link'
import lang_data from '/lib/lang.json'

export default function defaults() {
    return <div className='box col m-2'> test </div>
}

export function Link({ href, children, className, style, locale }) {
    return (
        <Links href={href || "#"} locale={locale}>
            <a className={className || ''} style={style}>
                {children}
            </a>
        </Links>
    )
}

export function Title(props) {

    let { title, className, style, ui } = props
    return (
        <div className={`Title box row alignY ${className ? className : ''} ${ui ? 'ui' : ''} `} style={style}>
            {title ? <h1 className='m'>{title}</h1> : ""}
            <div className="box R row center-full" >
                {props.children}
            </div>
        </div>
    );
}
export function LangContext(locale = 'en') {
    return lang_data[locale]
}