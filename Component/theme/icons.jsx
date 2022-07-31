
export default function Icons({ size, color, title, src, height, width }) {
    let Tag = src
    height = size ? size : height
    width = size ? size : width
    return (
        <Tag
            color={color ? color : '#00000'}
            title={title ? title : ''}
            height={height}
            width={width} />
    )
}