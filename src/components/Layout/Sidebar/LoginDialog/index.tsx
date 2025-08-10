import React from "react";
import { Dialog, DialogProps, Button } from "@blueprintjs/core";

import authApis from "apis/auth";
import useAsyncFn from "hooks/useAsyncFn";
import { LogDispatchContext, ACTIONS } from "reducers/log";
import PhoneLogin from "./phone";
import styles from "./style.module.css";

interface IProps extends DialogProps {
  onClose: () => void;
}

const { useContext, useEffect, useState } = React;

const LoginDialog: React.FC<IProps> = ({ isOpen, onClose = () => {} }) => {
  const [keyState, getQrKey] = useAsyncFn(authApis.getQrKey);
  const [loginQr, createLoginQr] = useAsyncFn(authApis.createLoginQr);
  const dispatch = useContext(LogDispatchContext);
  const [loginState, loginFn] = useAsyncFn(authApis.login);
  const { loading, error, value: loginValue } = loginState;
  const { value: key } = keyState;
  const [showQr, setShowQr] = useState(true);
  const { value: qr, loading: qrLoading } = loginQr;
  const [loginStatus, getLoginStatus] = useAsyncFn(authApis.getLoginStatus);
  const [status, checkStatus] = useAsyncFn(authApis.checkStatus);

  const cookie = localStorage.getItem("cookie");
  let loginError;

  useEffect(() => {
    getQrKey().then(res => {
      createLoginQr(res);
    });
  }, []);

  useEffect(() => {
    getLoginStatus(cookie);
  }, []);

  const handleLogin = async (data: any) => {
    const result = await loginFn(data);

    if (result && result.code === 200) {
      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: {
            ...result,
            userId: result.profile.userId
          }
        }
      });
      onClose();
    }
  };

  return (
    <Dialog style={{ width: 560 }} title="登录" isOpen={isOpen} onClose={onClose}>
      <div className={styles.loginDialogWrap}>
        {showQr ? (
          <div className={styles.qrWrap}>
            <div className={styles.qrRight}>
              <div className={styles.qrTitle}>扫码登录</div>
              <div className={styles.qrImgBox}>
                {!qrLoading && qr && <img className={styles.qrImg} src={qr.qrimg} alt="二维码" />}
              </div>
              <div className={styles.qrTip}>
                使用 <span className={styles.appName}>网易云音乐APP</span> 扫码登录
              </div>
              <Button className={styles.switchBtn} onClick={() => setShowQr(false)}>
                选择其他登录模式
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <PhoneLogin
              onLogin={handleLogin}
              loading={loading}
              error={error || (loginValue && loginValue.code !== 200 ? loginValue : null)}
            />
            <div className={styles.backBtnBox}>
              <Button minimal onClick={() => setShowQr(true)}>
                返回扫码登录
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default LoginDialog;
