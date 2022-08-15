import { useRouter } from "next/router"
import { LangContext, Link } from "/lib"

/**
 * 
 * @param {*} param0 
 * @returns  { mod, title, cildren, send }
 * 
 */
export default function Forms(props) {
    //  lang
    let { locale } = useRouter()
    let lang = LangContext(locale)
    let { send, title, sendContext = lang.send, formStyle, type, close } = props
    let classOne = props.classes ? '.' + props.classes : ''
    let Close = close ? close : () => {
        document.querySelector('.forms' + classOne)?.classList.toggle('none')
        document.querySelector('#forms')?.classList.toggle('none')
    }
    let style = {
        box: type
            ? { width: '100%', height: '100%', right: 0, top: 0, }
            : { right: 0, top: 0, zIndex: 1, width: '-webkit-fill-available', height: '-webkit-fill-available' },
        sh: { width: '100%', height: '100%', backdropFilter: 'blur(10px)' }
    }
    return (
        <div className={`forms m-auto box alignX alignY ${props.classes} ${type ? type : 'pup none'}`} style={style.box} >
            {!type ? <div style={style.sh} /> : ''}

            <div id="forms" className={`box col ui ${props.classes} ${type ? type : 'pup none'}`} style={formStyle}>

                <h2 className="box alignX m titles" >{title}</h2>
                {/* props ccildren */}

                {props.children}
                <div className="box row alignX-end">
                    {!type ? <button className="btn w-full diseble" onClick={Close} style={{ margin: ' 0 10px' }}>{lang.close}</button> : ''}
                    <button className="btn w-full " style={{ maxWidth: '350px' }} onClick={send ? send : Close}>{sendContext} </button>


                </div>
            </div>
        </div >
    )
}
