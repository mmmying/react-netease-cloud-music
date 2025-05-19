import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

import styles from './style.module.css'

interface IProps {
  title: string
  route: string
}

const LinkTitle: React.FC<IProps> = ({ title, route }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(route)
  }

  return (
    <div onClick={handleClick} className={styles.root}>
      {title}
      <Icon icon='chevron-right' />
    </div>
  )
}

export default LinkTitle
