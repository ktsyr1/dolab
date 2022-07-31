import Link from "lib/link"

export default function MenuAdmin() {
    return (
        <div className="box col ui R-p w-12">
            <b className="  p" >dashboard</b>

            {menu.map(a => {
                return (
                    <Link href={'/admin/' + a} className="ui p" >{a}</Link>
                )
            })}
        </div>
    )
}


let menu = [
    'tires', 'appointments', 'users',
]