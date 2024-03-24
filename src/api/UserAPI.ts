import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";
import { ForgotPassProp, LoginProp, ResetPassProp } from "../model/LoginProp";
import { handleError, showloading } from "../utils/apiUtil";

const baseUrl = 'http://192.168.56.1:8081/atomicHabits/users'

export const createUserAPI = async (user: CreateUserProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addUser`, user, {
      timeout: 5000,
    })).data)
    if (res.returnCode === 200) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  } catch (error) {
    handleError(error);
    return Promise.reject(error);
  }

}
export const loginAPI = async (loginUser: LoginProp): Promise<BackEndReturn> => {

  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/login`, loginUser, {
      timeout: 5000,
    })).data)
    //若200，則成功發送
    if (res.returnCode === 200) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  } catch (error) {
    handleError(error);
    return Promise.reject(error);
  }
}



export const forgotPassAPI = async (forgotprop: ForgotPassProp): Promise<BackEndReturn> => {
try{
  showloading();
  const res = ((await axios.post(`${baseUrl}/forgotPass`, forgotprop,{
    timeout: 5000,
  }
  )).data)

   if (res.returnCode === 200) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  handleError(error);
  return Promise.reject(error);
}

}
export const resetPassAPI = async (resetPass: ResetPassProp): Promise<BackEndReturn> => {
  try{
    showloading();
  const res = ((await axios.post(`${baseUrl}/ChangePass`, resetPass,{
    timeout: 5000,
  })).data)
  if (res.returnCode === 200) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  handleError(error);
  return Promise.reject(error);
}
}














export const loginByGoogleAPI = async (): Promise<BackEndReturn> => {

  const res = ((await axios.get(`https://accounts.google.com/o/oauth2/v2/auth?client_id=873017901473-nhu7e6oqaukaohql8tkq6b1etc1ehc9s.apps.googleusercontent.com&redirect_uri=http://localhost:5173/AH/home&response_type=id_token&scope=openid profile email&state=test&nonce=5566`)).data)

  return res;
}





export const getGoogleKey = () => {
  return axios.get('https://www.googleapis.com/oauth2/v3/certs');
}



