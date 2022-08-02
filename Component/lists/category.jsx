import { TrashOutline, PencilOutline } from "react-ionicons"

export default function ListsCategory({ data, classNames, onDelete, onEdit }) {
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