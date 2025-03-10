import Header from "@/components/Layouts/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Header/>
      <main>{children}</main>
    </>
  );
};

export default Layout;
