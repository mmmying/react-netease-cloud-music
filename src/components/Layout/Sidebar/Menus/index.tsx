import React from "react";
import { Icon, IconName } from "@blueprintjs/core";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";

import ROUTES from "constants/routes";
import styles from "./style.module.css";

import { useTranslation } from "react-i18next";

interface IMenuItem {
  icon: IconName;
  label: string;
  active?: boolean;
  route: string;
}

interface IMenu {
  title?: string;
  items: IMenuItem[];
}

const MENU: IMenu[] = [
  {
    items: [
      {
        icon: "music",
        label: "navigation.discover",
        route: ROUTES.DISCOVERY
      },
      {
        icon: "mobile-video",
        label: "navigation.videos",
        route: ROUTES.VIDEOS
      }
    ]
  },
  {
    title: "myMusic",
    items: [
      {
        icon: "import",
        label: "navigation.download",
        route: ROUTES.DOWNLOAD
      },
      {
        icon: "cloud",
        label: "navigation.cloud",
        route: ROUTES.CLOUD
      },
      {
        icon: "star-empty",
        label: "navigation.favorites",
        route: ROUTES.COLLECTION
      }
    ]
  }
];

const Menus = () => {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const handleMenuItemClick = (route: string) => {
    navigation(route);
  };


  return (
    <>
      {MENU.map(({ title, items }, index) => {
        return (
          <div className={styles.block} key={index}>
            {title && <div className={styles.title}>{t(title)}</div>}
            <div className={styles.tabs}>
              {items.map(({ icon, label, route }) => {
                const isActive = pathname.startsWith(route) || (pathname === ROUTES.ROOT && route === ROUTES.DISCOVERY);
                return (
                  <div
                    key={label}
                    className={isActive ? cn(styles.tab, styles.active) : styles.tab}
                    onClick={() => handleMenuItemClick(route)}
                  >
                    <Icon icon={icon} />
                    {t(label)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Menus;
