import React from "react";
import { Routes, Route, Navigate, useLocation  } from "react-router-dom";

import ROUTES from "constants/routes";
import styles from "./style.module.css";

const { Suspense, lazy } = React;

const Recommendation = lazy(() => import("./Recommendation"));
const SongList = lazy(() => import("./SongList"));
const LatestMusic = lazy(() => import("./LatestMusic"));

// const LeaderBoard = lazy(() => import("./LeaderBoard"));
// const Singers = lazy(() => import("./Singers"));
// const RecommendDaily = lazy(() => import("./RecommendDaily"));
const Test = () => {
  return <div>test</div>;
};
const Discovery = () => {
  return (
    <div className={styles.root}>
      <Suspense fallback={null}>
        <Routes>
          <Route path={ROUTES.RECOMMENDATION} element={<Recommendation />} />
          <Route path={ROUTES.SONG_LIST} element={<SongList />} />
          <Route path={ROUTES.LATEST_MUSIC} element={<LatestMusic />} />
          {/* <Route path={ROUTES.LEADER_BOARD} element={<LeaderBoard />} />
          <Route path={ROUTES.SINGERS} element={<Singers />} />
          <Route path={ROUTES.RECOMMEND_DAILY} element={<RecommendDaily />} /> */}
          {/* /discovery 或者 不匹配上面路由的，都显示Recommendation */}
          <Route path="/" element={<Navigate to={ROUTES.RECOMMENDATION} />} />
          {/* <Route path="*" element={<Recommendation />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
};

export default Discovery;
