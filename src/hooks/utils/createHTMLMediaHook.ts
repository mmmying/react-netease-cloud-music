import * as React from "react";
import { useEffect, useRef } from "react";
import useSetState from "hooks/useSetState";
import parseTimeRanges from "./parseTimeRanges";

// 媒体元素的属性接口，继承自 React 的音频和视频 HTML 属性
export interface HTMLMediaProps extends React.AudioHTMLAttributes<any>, React.VideoHTMLAttributes<any> {
  src: string;
}

// HTMLMediaState ：媒体状态接口
export interface HTMLMediaState {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
}

// HTMLMediaControls ：媒体控制接口
export interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

const createHTMLMediaHook = (tag: "audio" | "video") => {
  // 返回一个 hook 函数，这个 hook 函数会：
  // - 处理媒体元素的创建和属性设置
  // - 管理媒体状态（使用 useSetState）
  // - 提供事件处理（play, pause, volumeChange 等）
  // - 实现媒体控制方法
  // - 处理自动播放逻辑
  const useMedia = (
    elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>
  ): [React.ReactElement<HTMLMediaProps>, HTMLMediaState, HTMLMediaControls, { current: HTMLAudioElement | null }] => {
    let element: React.ReactElement<any> | undefined;
    let props: HTMLMediaProps;

    if (React.isValidElement(elOrProps)) {
      element = elOrProps;
      props = element.props;
    } else {
      props = elOrProps as HTMLMediaProps;
    }

    const [state, setState] = useSetState<HTMLMediaState>({
      buffered: [],
      time: 0,
      duration: 0,
      paused: true,
      muted: false,
      volume: 1
    });
    const ref = useRef<HTMLAudioElement | null>(null);

    const wrapEvent = (userEvent: any, proxyEvent?: any) => {
      return (event: React.BaseSyntheticEvent) => {
        try {
          proxyEvent && proxyEvent(event);
        } finally {
          userEvent && userEvent(event);
        }
      };
    };

    const onPlay = () => setState({ paused: false });
    const onPause = () => setState({ paused: true });
    const onVolumeChange = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({
        muted: el.muted,
        volume: el.volume
      });
    };
    const onDurationChange = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const { duration, buffered } = el;
      setState({
        duration,
        buffered: parseTimeRanges(buffered)
      });
    };
    const onTimeUpdate = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({ time: el.currentTime });
    };
    const onProgress = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({ buffered: parseTimeRanges(el.buffered) });
    };

    if (element) {
      element = React.cloneElement(element, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress)
      });
    } else {
      element = React.createElement(tag, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress)
      } as any); // TODO: fix this typing.
    }

    // Some browsers return `Promise` on `.play()` and may throw errors
    // if one tries to execute another `.play()` or `.pause()` while that
    // promise is resolving. So prevent that with this lock.
    // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
    let lockPlay = false;

    const controls = {
      play: () => {
        const el = ref.current;
        if (!el) {
          return undefined;
        }

        if (!lockPlay) {
          const promise = el.play();
          const isPromise = typeof promise === "object";

          if (isPromise) {
            lockPlay = true;
            const resetLock = () => {
              lockPlay = false;
            };
            promise.then(resetLock, resetLock);
          }

          return promise;
        }
        return undefined;
      },
      pause: () => {
        const el = ref.current;
        if (el && !lockPlay) {
          return el.pause();
        }
      },
      seek: (time: number) => {
        const el = ref.current;
        if (!el || state.duration === undefined) {
          return;
        }
        time = Math.min(state.duration, Math.max(0, time));
        el.currentTime = time;
      },
      volume: (volume: number) => {
        const el = ref.current;
        if (!el) {
          return;
        }
        volume = Math.min(1, Math.max(0, volume));
        el.volume = volume;
        setState({ volume });
      },
      mute: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        el.muted = true;
      },
      unmute: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        el.muted = false;
      }
    };

    useEffect(() => {
      const el = ref.current;

      if (!el) {
        if (process.env.NODE_ENV !== "production") {
          if (tag === "audio") {
            console.error(
              "useAudio() ref to <audio> element is empty at mount. " +
                "It seem you have not rendered the audio element, which it " +
                "returns as the first argument const [audio] = useAudio(...)."
            );
          } else if (tag === "video") {
            console.error(
              "useVideo() ref to <video> element is empty at mount. " +
                "It seem you have not rendered the video element, which it " +
                "returns as the first argument const [video] = useVideo(...)."
            );
          }
        }
        return;
      }

      setState({
        volume: el.volume,
        muted: el.muted,
        paused: el.paused
      });

      // Start media, if autoPlay requested.
      if (props.autoPlay && el.paused) {
        controls.play();
      }
    }, [props.src]);

    // hook 函数返回一个数组，包含：
    // - 媒体元素（React.ReactElement）
    // - 媒体状态（HTMLMediaState）
    // - 控制方法（HTMLMediaControls）
    // - ref 引用（用于直接访问 DOM 元素）
    return [element, state, controls, ref];
  };

  return useMedia;
};

export default createHTMLMediaHook;
