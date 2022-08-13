import MenuAdmin from "/theme/menu.admin";
import Footer from "/theme/footer";
import Nav from "/theme/nav";


export default function LayoutAdmin({ children }, { props }) {
    return (
        <>
            <Nav />

            <section className="box row">
                <MenuAdmin />
                <min className='box alignX w-full' >{children}</min>
            </section>
            <Footer />
        </>
    )
}
