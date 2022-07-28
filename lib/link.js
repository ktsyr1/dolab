import Links from 'next/link'

export default function Link({ href, children, className, style }) {
    return (
        <Links href={href || "#"} >
            <a className={className || ''} style={style}>
                {children}
            </a>
        </Links>
    )
}