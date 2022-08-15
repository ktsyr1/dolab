import Image from "next/image";
import { GridOutline, MenuOutline, PersonOutline, SearchOutline, LockClosedOutline, LanguageOutline, } from 'react-ionicons'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import { LangContext, Link } from "/lib"

export default function Nav() {
    function open() {
        document.querySelector('.menu').classList.toggle('sm-none')
        document.querySelector('.menu').classList.toggle('md-none')
        document.querySelector('.menu').classList.toggle('lg-none')
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
    let { locale } = useRouter()
    let lang = LangContext(locale)
    let data = [
        { content: lang?.home, href: '/' },
        { content: lang?.product, href: '/#' },
        { content: lang?.about, href: '/?' }
    ]
    return (
        <div className=" menu box row sm-pup sm-col sm-sh sm-none md-pup md-col md-sh md-none lg-none lg-pup lg-col lg-sh alignY alignY-full right-0" >
            <div className="box sm-col sm-sh md-col md-sh sm-w-full md-w-full lg-col lg-sh lg-w-full alignY" onClick={open}>
                {data.map(a => {
                    let { href, content, className } = a
                    return (
                        <Link href={href} key={href} className={" p-4 sm-w-full " + (className ? className : '')} style={a?.style}  >
                            {content}
                        </Link>
                    )
                })}
                {/* <Languages /> */}
            </div>
            <div className="box row sm-col md-col lg-col sm-w-full md-w-full lg-w-full" onClick={open} >
                <AuthItems />
            </div>
        </div >
    )
}
function Languages() {
    let { asPath, locale } = useRouter()
    return (
        <Link className='sm-w-full box alignY ' href={asPath} locale={locale !== 'en' ? 'en' : 'ar'} style={{ padding: '0 10px ' }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40">
                <g transform="translate(-234 -136.388)">
                    <g transform="translate(234 136.388)" fill="#fff" stroke="#ff7070" stroke-width="1">
                        <rect width="40" height="40" rx="8" stroke="none" />
                        <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="none" />
                    </g>
                    <text id="A" transform="translate(250 160.388)" fill="#ff7070" font-size="22" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">A</tspan></text>
                    <g id="Rectangle_2" data-name="Rectangle 2" transform="translate(247 148.388)" fill="#ff7070" stroke="#ff7070" stroke-width="1">
                        <path d="M23.49,0h0A3.51,3.51,0,0,1,27,3.51V24.49A3.51,3.51,0,0,1,23.49,28H3.51A3.51,3.51,0,0,1,0,24.49v-1A23.49,23.49,0,0,1,23.49,0Z" stroke="none" />
                        <path d="M23.217.5h0A3.283,3.283,0,0,1,26.5,3.783V24.217A3.283,3.283,0,0,1,23.217,27.5H3.783A3.283,3.283,0,0,1,.5,24.217v-1A22.717,22.717,0,0,1,23.217.5Z" fill="none" />
                    </g>
                    <text id="ع" transform="translate(270 165.388)" fill="#fff" font-size="18" font-family="Lalezar-Regular, Lalezar"><tspan x="0" y="0">ع</tspan></text>
                </g>
            </svg>


            <p className="p">{locale !== 'en' ? 'English' : 'عربي'}</p>
        </Link>
    )
}
function AuthItems() {
    let { locale, asPath } = useRouter()
    let lang = LangContext(locale)

    let auth = [
        {
            content: lang?.login, href: '/auth/login', className: 'sm-m-4 box alignX', style: {
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
        { content: lang?.signup, href: '/auth/signup', className: 'sm-m-4 btn', style: { minWidth: "120px" } },
    ]
    let token = Cookie.get('token')
    if (!token) {
        return auth.map(a => (
            <Link href={a?.href} key={a?.href} className={"sm-p-4 sm-w-full " + (a?.className ? a?.className : '')} style={a?.style}  >
                {a?.content}
            </Link>
        )
        )
    } else {
        return (
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
    }
}