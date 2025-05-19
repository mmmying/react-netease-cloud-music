import React from 'react'

import SongListItem from './SongListItem'
import styles from './style.module.css'
import { ISongList } from 'apis/types/business'

interface IProps {
  data?: ISongList[]
}

const SongLists: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data?.map(({ id, name, playCount, picUrl, coverImgUrl }, index) => {
        return <SongListItem key={index} id={id} name={name} playCount={playCount} picUrl={picUrl || coverImgUrl} />
      })}
    </div>
  )
}

export default SongLists
