

import Links from 'next/link'

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
        <Links href={href || "#"} >
            <a className={className || ''} style={style}>
                {children}
            </a>
        </Links>
    )
}