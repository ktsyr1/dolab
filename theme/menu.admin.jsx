import { useRouter } from "next/router"
import { LangContext, Link } from "/lib"

export default function MenuAdmin() {
    let { locale } = useRouter()
    let lang = LangContext(locale)
    let menu = [
        'tires',
        // 'appointments',
        // 'users',
        'categories', 'brands', 'maker'
    ]
    return (
        <div className="box row sm-none  md-none  lg-none menu_admin" style={{ width: '275px' }}>
            <div className="box col   ui w-11 R-m" style={{ height: '-webkit-fill-available', position: 'fixed' }}>
                <b className=" b-r p-5"  >{lang.dashborad}</b>
                <div className="box col  R" style={{ height: '-webkit-fill-available', overflowY: 'scroll' }}>

                    {menu.map(a => {
                        return (
                            <Link
                                href={'/admin/' + a}
                                className="p"
                                style={{ color: 'var(--color-ui)' }}
                                key={a}
                            >{lang[a]}</Link>
                        )
                    })}
                    <Link
                        href={'/admin/lang'}
                        className="p"
                        style={{ color: 'var(--color-ui)' }}
                    >{lang.lang}</Link>
                </div>
            </div>
        </div>
    )
}

