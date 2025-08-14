import React from 'react'
import { Tooltip, Icon, IconName } from '@blueprintjs/core'

import { MODE } from 'helpers/play'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

import { useTranslation } from "react-i18next";

const MODE_ORDER = [MODE.PLAY_IN_ORDER, MODE.SINGLE_CYCLE, MODE.SHUFFLE_PLAYBACK]

const MODE_MAP: IDictionary<{
  label: string
  icon: IconName
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: 'music.sequential',
    icon: 'sort',
  },
  [MODE.SINGLE_CYCLE]: {
    label: 'music.repeat',
    icon: 'repeat',
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: 'music.shuffle',
    icon: 'random',
  },
}

const { useContext, useCallback } = React

const PlayMode = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { playMode } = state

  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    const idx = MODE_ORDER.findIndex((m) => m === playMode)
    const nextMode = MODE_ORDER[(idx + 1) % MODE_ORDER.length]

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode,
      },
    })
  }, [dispatch, playMode])

  return (
    <Tooltip content={t(MODE_MAP[playMode].label)}>
      <Icon icon={MODE_MAP[playMode].icon} onClick={handleClick} />
    </Tooltip>
  )
}

export default PlayMode
