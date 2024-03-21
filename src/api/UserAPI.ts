import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";
import { LoginProp } from "../model/LoginProp";

const baseUrl = 'http://172.20.10.3:8081/atomicHabits/users'

export const createUserAPI = async (user:CreateUserProp):Promise<BackEndReturn> =>{
    return ((await axios.post( `${baseUrl}/addUser`,user)).data)
  }

  export const loginAPI = async (loginUser:LoginProp):Promise<BackEndReturn> =>{
    console.log(123)
    return ((await axios.post( `${baseUrl}/login`,loginUser)).data)
  }

  export const loginByGoogleAPI = async (loginByGoogle:LoginProp):Promise<BackEndReturn> =>{
    console.log(123)
    return ((await axios.post( `${baseUrl}/login`,loginByGoogle)).data)
  }


  export const getGoogleKey =  () =>{
    console.log(456)
    return  axios.get('https://www.googleapis.com/oauth2/v3/certs');
  }
 