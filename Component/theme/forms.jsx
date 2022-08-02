
/**
 * 
 * @param {*} param0 
 * @returns  { mod, title, cildren, send }
 * 
 */
export default function Form({ props, cildren }) {
    let { title, send } = props;
    function open() {
        document.getElementById('forms').classList.toggle('none');
    }
    return (
        <div id="forms" className={"box col ui none pup "} style={{ top: '90px' }}>
            <h2 className="box alignX m" >{title}</h2>
            {cildren}
            <button className="btn ui" onClick={send}>add</button>
        </div>
    )
}