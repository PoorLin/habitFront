import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";
import { ForgotPassProp, LoginProp, ResetPassProp } from "../model/LoginProp";
import { BASE_URL, EMAIL_NOT_EXIST, EMAIL_NOT_EXIST_NUMBER, SERVERERROR, SUCCESS_NUMBER, TIMEOUT_NUMBER, USER_NOT_EXIST, USER_NOT_EXIST_NUMBER, handleError, showError, showErrorNoText, showloading } from "../utils/apiUtil";

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
      showErrorNoText(EMAIL_NOT_EXIST);
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
      showErrorNoText(USER_NOT_EXIST);
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






export const getUserWeekRecordAPI = async (habitId:number): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/findLatestWeekRecord/${habitId}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}

export const findSuccRateAPI = async (userId:number): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/findSuccRate/${userId}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}

export const findSuccRateYearAPI = async (userId:number,year:number): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/findSuccRateYear?userId=${userId}&year=${year}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}



export const getHrExistYearsAPI = async (userId:number): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/getHrExistYears/${userId}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}


export const getHrExistYMAPI = async (userId:number): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/getHrExistYearAndMonth/${userId}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}


export const findSuccRateYMAPI = async (userId:number,year:string): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/findSuccRateYM?userId=${userId}&ym=${year}`, {
      timeout: TIMEOUT_NUMBER,
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    handleError(error,SERVERERROR);
    return Promise.reject(error);
  }
}



