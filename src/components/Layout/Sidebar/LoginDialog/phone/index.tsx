import React from 'react'
import { InputGroup, Button } from '@blueprintjs/core'

import styles from './style.module.css'

interface IProps {
  loading: boolean
  error: any
  onLogin: (args: { phone: string; password?: string }) => void
}

const { useState } = React

const PhoneLogin: React.FC<IProps> = ({ onLogin, loading, error }) => {
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    onLogin({
      phone,
      password,
    })
  }

  return (
    <div className={styles.phoneLoginWrap}>
      <div className={styles.inputWrap}>
        <InputGroup
          placeholder='请输入手机号'
          leftIcon='mobile-phone'
          value={phone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value)
          }}
        />
      </div>
      <div className={styles.inputWrap}>
        <InputGroup
          placeholder='请输入密码'
          leftIcon='lock'
          type='password'
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
        />
      </div>
      {error && <div className={styles.error}>{error.message}</div>}

      <div className={styles.loginBtn}>
        <Button onClick={handleLogin} loading={loading}>
          登录
        </Button>
      </div>
    </div>
  )
}

export default PhoneLogin 