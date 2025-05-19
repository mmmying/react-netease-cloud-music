import React from 'react'
import { useNavigate } from 'react-router-dom'

import PlayCount from 'components/PlayCount'
import PlayIcon from 'components/PlayIcon'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  id: number
  name: string
  playCount: number
  picUrl?: string
}

const { useCallback } = React

const SonglistItem: React.FC<IProps> = ({ id, name, playCount, picUrl }) => {
  const navigate = useNavigate()

  const handleItemClick = useCallback(() => {
    navigate(`${ROUTES.SONG_LISTS}/${id}`)
  }, [navigate, id])

  return (
    <div className={styles.root} onClick={handleItemClick}>
      <div className={styles.cover}>
        {picUrl && <img src={picUrl} loading='lazy' />}
        <PlayCount count={playCount} className={styles.playCount} />
        <PlayIcon className={styles.playIcon} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default SonglistItem
