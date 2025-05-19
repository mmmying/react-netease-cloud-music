import { Suspense, useMemo, useReducer, useCallback } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route, useParams, useLocation, Navigate, Outlet } from "react-router-dom";
import ROUTES from "constants/routes";
import Discover from "./pages/Discover";
import SonglistDetail from "./pages/SonglistDetail";
import playMusicReducer, {
  initialState,
  PlayMusicStateContext,
  PlayMusicDispatchContext,
  AudioContext,
  ACTIONS
} from "reducers/playMusic";
import useAudio from "hooks/useAudio";
import { MODE, playList as playListLocalStorage } from "helpers/play";
import { IMyMusic } from 'apis/types/business'

const Video = () => {
  const params = useParams();
  const location = useLocation();
  console.log("Video: ", params, location);
  return <div>video</div>;
};

// const Parent = () => {
//   return (
//     <div>
//       this is parent
//       <Outlet />
//     </div>
//   );
// };
// const Child = () => {
//   return <div>this is child</div>;
// };

function App() {
  const [state, dispatch] = useReducer(playMusicReducer, initialState);
  const { musicId, musicUrl, playMode } = state;
  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId]);
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: musicUrl,
    autoPlay: true,
    onEnded: () => playNextMusic(),
    onError: () => {
      if (playMode === MODE.SINGLE_CYCLE) {
        return;
      }
      playNextMusic();
    }
  });

  const audioInfo = useMemo(() => {
    return {
      audio,
      state: audioState,
      controls: audioControls,
      ref: audioRef
    };
  }, [musicUrl, audio, audioState, audioControls, audioRef]);

  const playMusic = useCallback(
    (index: number) => {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[index].id,
          music: playList[index]
        }
      });
    },
    [playList]
  );

  const playNextMusic = useCallback(() => {
    switch (playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = playList.findIndex(({ id }: IMyMusic) => id === musicId);
        if (playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0;
          playMusic(nextIdx);
        }
        return;
      }
      case MODE.SINGLE_CYCLE: {
        audioControls.play();
        return;
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (playList.length) {
          const randomIdx = Math.floor(Math.random() * playList.length);
          playMusic(randomIdx);
        }
        return;
      }
      default:
        return;
    }
  }, [musicId, playMode, audioControls, playList]);

  return (
    // 通过 Context.Provider 在组件树顶层或指定位置提供数据
    // 任何后代组件都可以通过 useContext 来获取数据
    <PlayMusicDispatchContext.Provider value={dispatch}>
      <PlayMusicStateContext.Provider value={state}>
        <AudioContext.Provider value={audioInfo}>
          <Layout>
            <Suspense fallback={null}>
              <Routes>
                <Route path={`${ROUTES.DISCOVERY}/*`} element={<Discover />} />
                <Route path={ROUTES.VIDEOS} element={<Video />} />
                <Route path={ROUTES.SONG_LIST_DETAIL} element={<SonglistDetail />} />
                <Route path="/" element={<Navigate to={ROUTES.DISCOVERY} />} />
                {/* <Route path="/parent" element={<Parent />}>
            <Route path="child" element={<Child />} />
          </Route> */}
              </Routes>
            </Suspense>
          </Layout>
        </AudioContext.Provider>
      </PlayMusicStateContext.Provider>
    </PlayMusicDispatchContext.Provider>
  );
}

export default App;
