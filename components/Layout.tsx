import { ReactNode } from "react";
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>          
            <Footer />
        </div>
      );
};

export default Layout;
