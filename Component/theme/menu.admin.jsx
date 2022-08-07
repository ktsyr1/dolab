import { useRouter } from "next/router"
import { Link } from "/lib"
import lang from "/lib/lang.json"

export default function MenuAdmin() {
    let { locale } = useRouter()

    let menu = [
        'tires',
        // 'appointments',
        // 'users',
        'categories', 'brinds', 'lang'
    ]
    return (
        <div className="box row w-12 m-4 sm-none menu_admin">
            <div className="box col pup">
                <b className=" b-r p"  >{lang[locale].dashborad}</b>
                {menu.map(a => {
                    return (
                        <Link
                            href={'/admin/' + a}
                            className="p"
                            style={{ color: 'var(--color-ui)' }}
                            key={a}
                        >{lang[locale][a]}</Link>
                    )
                })}
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

