
/**
 * 
 * @param {*} param0 
 * @returns  { mod, title, cildren, send }
 * 
 */
export default function Forms(props) {
    let { send, title, sendContext = 'send ', formStyle } = props
    let classOne = props.classes ? '.' + props.classes : ''
    let close = () => document.querySelector('.forms' + classOne)?.classList.toggle('none')
    return (
        <div className={'pup none forms m-auto box alignX alignY ' + props.classes} style={{
            width: '100%', height: '100%', right: 0, top: 0,
        }}>
            <div style={{ width: '100%', height: '100%', backdropFilter: 'blur(10px)' }} />

            <div id="forms" className={"box col ui pup "} style={formStyle}>

                <h2 className="box alignX m titles" >{title}</h2>
                {/* props ccildren */}

                {props.children}
                <div className="box row">
                    <button className="btn w-full diseble" onClick={close} style={{ margin: ' 0 10px' }}>close</button>
                    <button className="btn w-full " onClick={send || close}>{sendContext} </button>


                </div>
            </div>
        </div>
    )
}
