import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import style from "./style.module.css";

const Layout = ({ children }) => {
  return (
    <div className={style.layout}>
      <Header />
      <div className={style.container}>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
