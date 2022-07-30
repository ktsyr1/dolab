

import Links from 'next/link'

export default ''
export function Input(props) {
    return (
        <>
            <p>{props.title}</p>
            <input {...props} />
        </>
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