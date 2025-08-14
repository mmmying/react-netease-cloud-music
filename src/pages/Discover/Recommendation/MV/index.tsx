import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import MVItem from './MVItem'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'

import styles from './style.module.css'

import { useTranslation } from "react-i18next";

const { useEffect } = React

const MV = () => {
  const [state, getPersonalizedMVFn] = useAsyncFn(personalizedApis.getPersonalizedMV)
  const { value: mvs = [], loading: isGettingMV } = state

  const { t } = useTranslation()

  useEffect(() => {
    getPersonalizedMVFn()
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title={t('navigation.recommendedMV')} route={ROUTES.MV} />
      {isGettingMV ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          {mvs.map(({ name, artistName, playCount, picUrl, copywriter }) => {
            return (
              <MVItem
                key={name}
                name={name}
                artistName={artistName}
                playCount={playCount}
                picUrl={picUrl}
                copywriter={copywriter}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MV
