import React from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import cn from 'classnames'

import { LogStateContext } from 'reducers/log'
import { ISongList } from 'apis/types/business'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  title: string
  data?: ISongList[]
}

const { useContext } = React

const Songlist: React.FC<IProps> = ({ title, data }) => {
  const navigate = useNavigate()
  const routeMatch = useMatch(ROUTES.SONG_LIST_DETAIL)
  const logState = useContext(LogStateContext)

  const handleClick = (id: number) => navigate(`${ROUTES.SONG_LISTS}/${id}`)

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {data?.map(({ id, name, trackCount }) => {
          const isActive = routeMatch && Number(routeMatch.params.songlistId) === id
          const text = `${name.replace(logState.user.profile.nickname, '我')}（${trackCount}首）`
          return (
            <div
              key={id}
              title={text}
              className={cn(styles.item, isActive && 'active')}
              onClick={() => handleClick(id)}
            >
              {text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Songlist
