import Image from "next/image";
import { GridOutline, MenuOutline, PersonOutline, SearchOutline } from 'react-ionicons'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import { LangContext, Link } from "/lib"

export default function Nav() {
    function open() {
        document.querySelector('.menu').classList.toggle('sm-none')
        document.querySelector('.menu').classList.toggle('md-none')
        document.querySelector('.menu_admin')?.classList.toggle('none')
    }
    return (
        <nav className="R-m alignX-full alignY box  sh pup ">
            {/* btn menu */}
            <div className="sm-box md-box  m" onClick={open}>
                <MenuOutline title={'menu'} color={'#00000'} height="40px" width="40px" />
            </div>
            {/* logo */}
            <Link href={'/'} >
                <Image src={'/images/logo.png'} width={54} height={40} style={{ filter: 'drop-shadow(1px 1px 1px #FFFfff99)' }} />
            </Link>
            {/* menu */}
            <Menu open={open} />
            {/* search */}
            <Link href='/search' className='sm-box md-box m'  >
                <SearchOutline color={'#00000'} title={'Search'} height="40px" width="40px" />
            </Link>
        </nav >
    )
}

function Menu({ open }) {
    let [Auth, setAuth] = useState('')
    let { locale, asPath } = useRouter()

    let lang = LangContext(locale) 
    let data = [
        { content: lang?.home, href: '/' },
        { content: lang?.product, href: '/#' },
        { content: lang?.about, href: '/?' }
    ]
    let auth = [
        {
            content: 'login', href: '/auth/login', className: 'sm-m-4 box alignX', style: {
                border: '1px solid var(--color-Ui)',
                color: 'var(--color-Ui)',
                borderRadius: '10px',
                margin: '0 1rem',
                padding: '10px',
                fontSize: 'larger',
                fontWeight: 700,
                minWidth: "120px"
            }
        },
        { content: 'signup', href: '/auth/signup', className: 'sm-m-4 btn', style: { minWidth: "120px" } },
    ]
    useEffect(() => {
        let token = Cookie.get('token')
        if (!token) {
            let links = auth.map(a => {
                let { href, content, className } = a
                return (
                    <Link href={href} key={href} className={"sm-p-4 sm-w-full " + (className ? className : '')} style={a?.style}  >
                        {content}
                    </Link>
                )
            })
            setAuth(links)
        } else {
            let Person = () => (
                < >
                    <Link href='#' className='box row alignY m' >
                        <PersonOutline color={'#00000'} title={'profile'} height="30px" width="30px" />
                        <p className="p-3">{lang?.profile}</p>
                    </Link>
                    <Link href='/admin' className='box row alignY m' >
                        <GridOutline color={'#00000'} title={'admin'} height="40px" width="40px" />
                        <p className="p-3">{lang?.dashboard}</p>

                    </Link>
                </>
            )
            setAuth(<Person />)
            // setAuth('.')
        }
    }, [])
    let setlang = () => router.push(asPath, asPath, { locale: 'en' })
    return (
        <div className=" menu box row sm-pup sm-col sm-sh sm-none md-pup md-col md-sh md-none alignY alignY-full right-0" >
            <div className="box sm-col sm-sh md-col md-sh sm-w-full md-w-full" onClick={open}>
                {data.map(a => {
                    let { href, content, className } = a 
                    return (
                        <Link href={href} key={href} className={" p-4 sm-w-full " + (className ? className : '')} style={a?.style}  >
                            {content}
                        </Link>
                    )
                })}
                {
                    locale !== 'en'
                        ? <Link className='p sm-w-full' href={asPath} locale="en" >english</Link>
                        : <Link className='p sm-w-full' href={asPath} locale="ar">عربي</Link>
                }
            </div>
            <div className="box row sm-col md-col sm-w-full md-w-full " onClick={open} >
                {Auth}
            </div>


        </div >
    )
}