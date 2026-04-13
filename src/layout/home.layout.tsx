
import NavbarComponent from '../components/navbar.components'
import { Outlet } from 'react-router'
import FooterComponent from '../components/footer.component'

function HomeLayout() {
    return (
        <>
            <NavbarComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default HomeLayout