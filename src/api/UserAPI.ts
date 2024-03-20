import axios from "axios";
import { CreateUserProp } from "../model/CreateUserPop";
import { BackEndReturn } from "../model/BackEndReturn";

const baseUrl = 'http://172.20.10.9:8081/atomicHabits/users'

export const createUserAPI = async (user:CreateUserProp):Promise<BackEndReturn> =>{
    return ((await axios.post( `${baseUrl}/addUser`,user)).data)
  }

