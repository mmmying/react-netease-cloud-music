import { Icon } from "@blueprintjs/core";
import ROUTES from "routes";
import { Link } from "react-router-dom";
import style from "./style.module.css";

interface IMenu {
  title: string;
  items: {
    icon: string;
    label: string;
    route: string;
  }[];
}
const Menu: IMenu[] = [
  {
    title: "",
    items: [
      {
        icon: "music",
        label: "发现音乐",
        route: ROUTES.DISCOVER
      },
      {
        icon: "list",
        label: "歌单",
        route: ROUTES.PLAYLIST
      }
    ]
  },
  {
    title: "我的",
    items: [
      {
        icon: "heart",
        label: "我喜欢的音乐",
        route: "/like"
      },
      {
        icon: "star",
        label: "我的收藏",
        route: "/star"
      }
    ]
  }
];
const Menus = () => {
  const handleMenuItemClick = (route: string) => {
    console.log("handleMenuItemClick", route);
  };

  return (
    <>
      {Menu.map(({ title, items }: any, index: any) => (
        <div key={index}>
          <div className={style.menuTitle}>{title}</div>
          <div>
            {items.map(({ icon, label, route }, itemIndex: any) => {
              return (
                <div key={itemIndex} className={style.menuItem}>
                  <Link
                    to={route}
                    className={style.link}
                    onClick={() => {
                      handleMenuItemClick(route);
                    }}
                  >
                    <Icon icon={icon} />
                    {label}
                  </Link>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Menus;
