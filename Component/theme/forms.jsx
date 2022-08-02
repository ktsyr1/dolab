
/**
 * 
 * @param {*} param0 
 * @returns  { mod, title, cildren, send }
 * 
 */
export default function Form({ props, cildren }) {
    let { title, send } = props;
    function open() {
        document.getElementById('froms').classList.toggle('none');
    }
    return (
        <div id="froms" className={"box col ui none pup "} style={{ top: '90px' }}>
            <h2 className="box alignX m" >{title}</h2>
            {cildren}
            <button className="btn ui" onClick={send}>add</button>
        </div>
    )
}