import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import PlayCount from 'components/PlayCount'
import { ISongList } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  data: ISongList[]
}

const { useContext } = React

const Songlists: React.FC<IProps> = ({ data }) => {
  const navigate = useNavigate()
  const dispatch = useContext(PlayMusicDispatchContext)

  const handleItemClick = (id: number) => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
    navigate(`${ROUTES.SONG_LISTS}/${id}`)
  }

  return (
    <div className={styles.root}>
      {data.map(({ name, playCount, coverImgUrl, id }) => {
        return (
          <div key={id} className={styles.item} onClick={() => handleItemClick(id)}>
            <div className='smallCover'>
              <img src={`${coverImgUrl}?param=55y55`} loading='lazy' />
            </div>
            <div className={styles.info}>
              <div className={cn(styles.name, 'singleLineEllipsis')}>{name}</div>
              <PlayCount count={playCount} className={styles.playCount} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Songlists
