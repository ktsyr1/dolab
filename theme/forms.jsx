import { useRouter } from "next/router"
import { LangContext, Link } from "/lib"
import styled from "styled-components"

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

let Box = styled.div`
    height: 80px;
    padding-top: 10px;
    `
let Label = styled.label`  
        background-color: #fff;
        padding: 0px 15px;
        width: min-content;
        border-radius: 10px; 
        white-space: pre; 
    `
export function Input(props) {
    let { locale } = useRouter()
    let lang = LangContext(locale)
    let title = props?.title ? props.title : lang[props.name]
    return (
        <Box className='box col m-2'>
            <Label htmlFor={props?.name}>{title}</Label>
            <input type={props.type ? props.type : 'text'} {...props} />
        </Box>
    )
}

export function InputLines(props) {
    return (
        <Box className='box col m-2'>
            <Label>{props.title}</Label>
            <textarea type={props.type ? props.type : 'text'} {...props} />
        </Box>
    )
}