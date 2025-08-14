import * as React from "react";
import { useRef, useEffect } from "react";
import useSetState from "hooks/useSetState";

const createHTMLMediaHook = (tag: string) => {
  const useMedia = () => {
    let element;
    const [state, setState] = useSetState({
      buffered: [],
      time: 0,
      duration: 0,
      paused: true,
      muted: false,
      volume: 1
    });
    const ref = useRef<HTMLMediaElement>();
    const controls = {
      play: () => {},
      pause: () => {},
      mute: () => {},
      unmute: () => {},
      volume: (volume: number) => {},
      seek: (time: number) => {}
    };
    return [element, state, controls, ref];
  };
  return useMedia;
};

export default createHTMLMediaHook;
