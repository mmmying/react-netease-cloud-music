import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";
import ROUTES from "constants/routes";

import styles from "./style.module.css";

import { useTranslation } from "react-i18next";

const NAVBAR = {
  [ROUTES.DISCOVERY]: [
    {
      label: "navigation.recommend",
      route: `${ROUTES.DISCOVERY}/${ROUTES.RECOMMENDATION}`
    },
    // {
    //   label: '每日歌曲推荐',
    //   route: `${ROUTES.DISCOVERY}/${ROUTES.RECOMMEND_DAILY}`,
    // },
    {
      label: "navigation.playlist",
      route: `${ROUTES.DISCOVERY}/${ROUTES.SONG_LIST}`
    },
    // {
    //   label: '排行榜',
    //   route: ROUTES.LEADER_BOARD,
    // },
    // {
    //   label: '歌手',
    //   route: ROUTES.SINGERS,
    // },
    {
      label: "navigation.latest",
      route: `${ROUTES.DISCOVERY}/${ROUTES.LATEST_MUSIC}`
    }
  ],
  [ROUTES.VIDEOS]: [
    {
      label: "视频",
      route: ROUTES.VIDEO
    },
    {
      label: "MV",
      route: ROUTES.MV
    }
  ]
};

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const matchPathPrefix = Object.keys(NAVBAR).find(key => pathname.startsWith(key));

  if (!matchPathPrefix) {
    return null;
  }


  const items = NAVBAR[matchPathPrefix];

  const hasMatchRoute = items.find(({ route }) => route === pathname);

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className={styles.root}>
      {items.map(({ label, route }, index) => {
        const isActive = hasMatchRoute ? route === pathname : index === 0;

        return (
          <div key={label} className={cn(styles.item, isActive ? styles.active : "")} onClick={() => handleItemClick(route)}>
            {t(label)}
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
