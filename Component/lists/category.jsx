export default function ListsCategory({ data, classNames }) {
    let { name, slug } = data
    return (
        <>
            <div className={"box row w-full " + classNames}>
                <p className="w-10 p "  >{name}</p>
                <p className="w-10 p "  >{slug}</p>
            </div>
            <hr />
        </>
    )
}