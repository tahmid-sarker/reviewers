import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import DynamicTitle from '../shared/DynamicTitle';

const MainLayout = () => {
    return (
        <>
        <DynamicTitle />
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayout;