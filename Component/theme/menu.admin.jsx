import { useRouter } from "next/router"
import { LangContext, Link } from "/lib"

export default function MenuAdmin() {
    let { locale } = useRouter()
    let lang = LangContext(locale) 
    let menu = [
        'tires',
        // 'appointments',
        // 'users',
        'categories', 'brinds'
    ]
    return (
        <div className="box row w-12 m-4 sm-none menu_admin">
            <div className="box col pup">
                <b className=" b-r p"  >{lang.dashborad}</b>
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
                <hr />
                <Link
                    href={"/" + locale === 'ar' ? 'en' : locale}
                    className="p"
                    style={{ color: 'var(--color-ui)' }}
                // locale={locale === 'ar' ? locale : 'en'}
                > {locale === 'ar' ? 'en' : locale}</Link>
            </div>
        </div>
    )
}

