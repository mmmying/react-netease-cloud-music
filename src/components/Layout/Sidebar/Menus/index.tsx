import { Icon } from "@blueprintjs/core";
// import style from "./style.module.css";
import ROUTES from "route"

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
        route: "/discover"
      },
      {
        icon: "star-empty",
        label: "我的收藏",
        route: "/playlist"
      }
    ]
  }
];
const Menus = () => {
  const handleMenuItemClick = (route: string) => {
    window.location.hash = route;
  }

  return (
    <>
      {Menu.map(({ title, items }: any, index: any) => (
        <div key={index}>
          <div>{title}</div>
          <div>
            {items.map(({ icon, label, route }, itemIndex: any) => (
              <div key={itemIndex} onClick={()=>{handleMenuItemClick(route)}}>
                <Icon icon={icon} />
                {label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Menus;
