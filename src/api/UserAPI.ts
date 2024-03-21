import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";
import { ForgotPassProp, LoginProp, ResetPassProp } from "../model/LoginProp";

const baseUrl = 'http://192.168.56.1:8081/atomicHabits/users'

export const createUserAPI = async (user:CreateUserProp):Promise<BackEndReturn> =>{
    return ((await axios.post( `${baseUrl}/addUser`,user)).data)
  }

  export const loginAPI = async (loginUser:LoginProp):Promise<BackEndReturn> =>{

    return ((await axios.post( `${baseUrl}/login`,loginUser)).data)
  }


  export const forgotPassAPI = async (forgotprop:ForgotPassProp):Promise<BackEndReturn> =>{

    return ((await axios.post( `${baseUrl}/forgotPass`,forgotprop)).data)
  }
  export const resetPassAPI = async (resetPass:ResetPassProp):Promise<BackEndReturn> =>{

    return ((await axios.post( `${baseUrl}/ChangePass`,resetPass)).data)
  }














  export const loginByGoogleAPI = async (loginByGoogle:LoginProp):Promise<BackEndReturn> =>{

    return ((await axios.post( `${baseUrl}/login`,loginByGoogle)).data)
  }




  
  export const getGoogleKey =  () =>{

    return  axios.get('https://www.googleapis.com/oauth2/v3/certs');
  }
 