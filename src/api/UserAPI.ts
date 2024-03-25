import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";
import { ForgotPassProp, LoginProp, ResetPassProp } from "../model/LoginProp";
import { BASE_URL, EMAIL_NOT_EXIST, EMAIL_NOT_EXIST_NUMBER, SERVERERROR, SUCCESS_NUMBER, TIMEOUT_NUMBER, USER_NOT_EXIST, USER_NOT_EXIST_NUMBER, handleError, showError, showloading } from "../utils/apiUtil";

const baseUrl = `${BASE_URL}/atomicHabits/users`

export const createUserAPI = async (user: CreateUserProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addUser`, user, {
      timeout: TIMEOUT_NUMBER,
    })).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    }else if(res.returnCode === EMAIL_NOT_EXIST_NUMBER){
      showError(EMAIL_NOT_EXIST);
      return res;
    } 
    else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  } catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }

}
export const loginAPI = async (loginUser: LoginProp): Promise<BackEndReturn> => {

  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/login`, loginUser, {
      timeout: TIMEOUT_NUMBER,
    })).data)
    //若200，則成功發送
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else if (res.returnCode === USER_NOT_EXIST_NUMBER){
      showError(USER_NOT_EXIST);
      return res;
    }
    else{
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  } catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}



export const forgotPassAPI = async (forgotprop: ForgotPassProp): Promise<BackEndReturn> => {
try{
  showloading();
  const res = ((await axios.post(`${baseUrl}/forgotPass`, forgotprop,{
    timeout: TIMEOUT_NUMBER,
  }
  )).data)

   if (res.returnCode === 200) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  handleError(error,SERVERERROR);
  return Promise.reject(error);
}

}
export const resetPassAPI = async (resetPass: ResetPassProp): Promise<BackEndReturn> => {
  try{
    showloading();
  const res = ((await axios.post(`${baseUrl}/ChangePass`, resetPass,{
    timeout: TIMEOUT_NUMBER,
  })).data)
  if (res.returnCode === SUCCESS_NUMBER) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  handleError(error,SERVERERROR);
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



