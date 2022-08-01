import Image from "next/image";
import { GridOutline, MenuOutline, PersonOutline, SearchOutline } from 'react-ionicons'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import Link from 'lib/link.jsx'

export default function Nav() {
    function open() {
        document.querySelector('.menu').classList.toggle('sm-none')
        document.querySelector('.menu').classList.toggle('md-none')
        console.log('aas');
    }
    return (
        <nav className="R-m alignX-full alignY box  sh pup ">
            {/* btn menu */}
            <div className="sm-box md-box none" onClick={open}>
                <MenuOutline title={'menu'} color={'#00000'} height="40px" width="40px" />
            </div>
            {/* logo */}
            <Link href={'/'} >
                <Image src={'/images/logo.png'} width={54} height={40} style={{ filter: 'drop-shadow(1px 1px 1px #FFFfff99)' }} />
            </Link>
            {/* menu */}
            <Menu />
            {/* search */}
            <Link href='/search' onClick={open}>
                <SearchOutline color={'#00000'} title={'Search'} height="40px" width="40px" />
            </Link>
        </nav >
    )
}

function Menu() {
    let [Auth, setAuth] = useState('')
    let data = [
        { content: 'Home', href: '/' },
        { content: 'prodect', href: '/prodect' },
        { content: 'about', href: '/about' }
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
                fontWeight: 700
            }
        },
        { content: 'signup', href: '/auth/signup', className: 'sm-m-4 btn' },
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
                    <Link href='#' className='box row alignY m'>
                        <PersonOutline color={'#00000'} title={'profile'} height="40px" width="40px" />
                        <p  className="p-3">profile</p>
                    </Link>
                    <Link href='/admin' className='box row alignY m'>
                        <GridOutline color={'#00000'} title={'admin'} height="40px" width="40px" />
                        <p className="p-3">dashboard</p>

                    </Link>
                </>
            )
            setAuth(<Person />)
            // setAuth('.')
        }
    }, [])

    return (
        <div className=" menu box row sm-pup sm-col sm-sh sm-none md-pup md-col md-sh md-none alignY alignY-full right-0" >
            <div className="box sm-col sm-sh md-col md-sh sm-w-full md-w-full">
                {data.map(a => {
                    let { href, content, className } = a
                    return (
                        <Link href={href} key={href} className={" p-4 sm-w-full " + (className ? className : '')} style={a?.style}  >
                            {content}
                        </Link>
                    )
                })}
            </div>
            <div className="box row sm-col md-col sm-w-full md-w-full "  >
                {Auth}
            </div>


        </div >
    )
}