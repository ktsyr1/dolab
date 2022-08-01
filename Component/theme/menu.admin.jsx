import {Link} from "/lib"

export default function MenuAdmin() {
    return (
        <div className="box col ui R-p w-12">
            <b className=" b-r p"  >dashboard</b>
            {menu.map(a => {
                return (
                    <Link href={'/admin/' + a} className="ui p" key={a}>{a}</Link>
                )
            })}
        </div>
    )
}


let menu = [
    'tires', 'appointments', 'users','category','brinds'
] 