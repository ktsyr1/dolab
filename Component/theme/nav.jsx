import Image from "next/image";
import { GridOutline, MenuOutline, SearchOutline } from 'react-ionicons'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import Link from 'lib/link'

export default function Nav() {
    let [admin, setAdmin] = useState('')
    let [Icons, setIcons] = useState({ width: '40px' })
    useEffect(() => {
        let _admin = Cookie.get('-admin')
        if (_admin) {
            setAdmin(
                <Link href='/admin'>
                    <GridOutline color={'#00000'} title={'admin'} height="40px" width="40px" />
                </Link>
            )
            setIcons({ width: '100px' })
        }
    }, [])
    return (
        <nav className="R-m alignX-full alignY box p-4 sh pup ">
            <style jsx>{`

                @media (min-width: 576px){
                    nav{ padding: 1em 4em }
                }
                `}</style>

            {/* btn menu */}
            <div className="sm-box none" onClick={() => {
                document.querySelector('.menu').classList.toggle('sm-none')
            }}>
                <MenuOutline title={'menu'} color={'#00000'} height="40px" width="40px" />
            </div>
            {/* logo */}
            <Link href={'/'} >
                <Image src={'/images/logo.png'} width={54} height={40} />
            </Link>
            {/* menu */}
            <Menu />
            {/* search */}
            <div className="box row alignY alignX-full" style={Icons} >
                <Link href='/search'>
                    <SearchOutline color={'#00000'} title={'Search'} height="40px" width="40px" />
                </Link>
                {admin}
            </div>
        </nav >
    )
}

function Menu() {
    let data = [
        { content: 'Home', href: '/' },
        { content: 'prodect', href: '/prodect' },
        { content: 'about', href: '/about' },
        {
            content: 'login', href: '/admin/login', className: 'sm-m-4 box alignX', style: {
                border: '1px solid var(--color-Ui)', color: 'var(--color-Ui)', borderRadius: '10px', margin: '0 1rem', padding: '10px'
            }
        },
        { content: 'signup', href: '/admin/signup', className: 'sm-m-4 btn' },
    ]
    return (
        <div className=" menu box row sm-pup sm-col sm-sh sm-none  alignY right-0" >
            {data.map(a => {
                let { href, content, className } = a
                return (
                    <Link href={href} key={href} className={"sm-p-4 w-full " + (className ? className : '')} style={a?.style}  >
                        {content}
                    </Link>
                )
            })}
        </div >
    )
}