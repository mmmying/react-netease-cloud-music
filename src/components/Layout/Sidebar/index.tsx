import Menus from "./Menus";
import style from "./style.module.css";

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Menus />
    </div>
  );
};

export default Sidebar;
