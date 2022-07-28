import Footer from "../theme/footer";
import Nav from "../theme/nav";


export default function Layout({ children }, { props }) {
    return (
        <>
            <Nav />
            <section>{children}</section>
            <Footer />
        </>
    )
}
