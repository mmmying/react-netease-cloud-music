import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

import Navbar from './Navbar'
import Searcher from './Searcher'
import LanguageSwitcher from '../../LanguageSwitcher'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
// import { REPOSITORY } from 'constants/github'
import styles from './style.module.css'

const { useContext } = React

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { showLyric } = state

  const handleGoBack = () => navigate(-1)
  const handleGoForward = () => navigate(1)

  const hideLyric = () => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.iconsWrap}>
          {showLyric && (
            <div className={styles.down} onClick={hideLyric}>
              <Icon icon='chevron-down' iconSize={20} />
            </div>
          )}
        </div>

        {!showLyric && (
          <div className={styles.backForward}>
            <div onClick={handleGoBack}>
              <Icon icon='chevron-left' />
            </div>
            <div onClick={handleGoForward}>
              <Icon icon='chevron-right' />
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div>{!showLyric && <Navbar />}</div>
        <div className={styles.operations}>
          <Searcher />
          <LanguageSwitcher />
          {/* <div className={styles.githubLogo} onClick={() => window.open(REPOSITORY)} /> */}
        </div>
      </div>
    </div>
  )
}

export default Header
