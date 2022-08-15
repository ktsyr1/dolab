import MenuAdmin from "/theme/menu.admin";
import Footer from "/theme/footer";
import Nav from "/theme/nav";


export default function LayoutAdmin({ children }, { props }) {
    return (
        <div className="box row">
            <MenuAdmin />
            <div className="box col w-full">
                <Nav />
                <section className="box row p">
                    <min className='box alignX w-full' >{children}</min>
                </section> 
            </div>
        </div>
    )
}
