import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import SongLists from 'components/SongList'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'
import styles from './style.module.css'

import { useTranslation } from "react-i18next";

const { useEffect } = React

const Songlist = () => {
  const [state, personalizedSonglistFn] = useAsyncFn(personalizedApis.getPersonalizedSonglist)
  
  const { value: songlist = [], loading: isGettingSonglist } = state || {}

  const { t } = useTranslation()

  useEffect(() => {
    personalizedSonglistFn({ limit: 10 })
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title={t('navigation.recommendedPlaylist')} route={ROUTES.SONG_LIST} />
      {isGettingSonglist ? <Spinner /> : <SongLists data={songlist} />}
    </div>
  )
}

export default Songlist
