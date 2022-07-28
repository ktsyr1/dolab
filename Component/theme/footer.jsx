import Image from "next/image";

export default function Footer() {
    return (
        <footer className="box grid sh R-m p-5 alignX-full" >
            <div>
                <b className="R"> SERVICES </b>
                <ul>
                    {[1, 2, 3, 4].map(a => <li key={a}>link</li>)}
                </ul>
            </div>
            <div>
                <b className="R"> SHOP </b>
                <ul>
                    {[1, 2, 3, 4].map(a => <li key={a}>link</li>)}
                </ul>
            </div>
            <div>
                <b className="R">CONTACT US</b>
                <ul>
                    {[1, 2, 3, 4].map(a => <li key={a}>link</li>)}
                </ul>
            </div>
        </footer>
    )
}