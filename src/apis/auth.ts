import axios from "helpers/axios";
import { ILoginRequest, ILoginResult } from "./types/auth";

type LoginFn = (params: ILoginRequest) => Promise<ILoginResult>;

const login: LoginFn = ({ phone, password }) => {
  return axios({
    url: "/login/cellphone",
    params: {
      phone,
      password
    }
  });
};

const logout = () => {
  return axios({
    method: "post",
    url: "/logout"
  });
};

const getQrKey = async () => {
  const response = await axios({
    url: "/login/qr/key",
    params: {
      timestamp: Date.now()
    }
  });
  return response.data.unikey;
};

const createLoginQr = async ({ key }) => {
  const response = await axios({
    url: "/login/qr/create",
    params: {
      key,
      qrimg: true,
      timestamp: Date.now()
    }
  });
  return response.data;
};

const checkStatus = async ({ key }) => {
  const response = await axios({
    url: "/login/qr/check",
    params: {
      key,
      timestamp: Date.now()
    }
  });
  return response.data;
};

const getLoginStatus = async (cookie) => {
  const response = await axios({
    url: `/login/status?timestamp=${Date.now()}`,
    method: "post",
    data: {
      cookie
    }
  });
  return response.data;
};

export default {
  login,
  logout,
  getQrKey,
  createLoginQr,
  checkStatus,
  getLoginStatus
};
