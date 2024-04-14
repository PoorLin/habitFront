import axios from "axios";
import { CreateHabitProp, DeleteHabitDTO, EditHabit, EditHabitProp, EditHabitStatus, GetOneHabitDTO, Habit, HabitListDTO, HabitStatus, MakeChartProp } from "../model/habit";
import { BackEndReturn } from "../model/BackEndReturn";
import { BASE_URL, HABIT_ALREADY_EXIST, HABIT_ALREADY_EXIST_NUMBER, SERVERERROR, SUCCESS_NUMBER, TIMEOUT_NUMBER, handleError, showError, showErrorNoText, showErrorToHome, showloading, showloadingForFetch } from "../utils/apiUtil";
import Swal from "sweetalert2";

const baseUrl = `${BASE_URL}/atomicHabits/habit`










export const createHabitAPI = async (habit: CreateHabitProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addHabit`, habit,{
    timeout: TIMEOUT_NUMBER,
    headers:{
      'Authorization': `${habit.token}`,
      'Access-Control-Allow-Origin': '*'
    }
  })).data)

  if (res.returnCode === SUCCESS_NUMBER) {
    return res;
  }else if(res.returnCode === HABIT_ALREADY_EXIST_NUMBER){
    showErrorNoText(HABIT_ALREADY_EXIST);
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  showErrorToHome(error.response.data.data);
  return Promise.reject(error);
}
}


export const updateHabitAPI = async (habit: EditHabitProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res =((await axios.put(`${baseUrl}/${habit.habitId}`, habit,{
    timeout: TIMEOUT_NUMBER,
    headers:{
      'Authorization': `${habit.token}`,
      'Access-Control-Allow-Origin': '*'
    }
  })).data)
  if (res.returnCode === SUCCESS_NUMBER) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  showErrorToHome(error.response.data.data);
  return Promise.reject(error);
}
}
export const updateHabitStatusAPI = async (habit: EditHabitStatus): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.put(`${baseUrl}/updateHabitStatus`, habit,{
    timeout: TIMEOUT_NUMBER,
    headers:{
      'Authorization': `${habit.token}`
    }
  })).data)
  if (res.returnCode === SUCCESS_NUMBER) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`Request failed with status code ${res.returnCode}`);
  }
} catch (error) {
  showErrorToHome(error.response.data.data);
  return Promise.reject(error);
}
}

export const getUserHabitAPI = async (habitListDTO: HabitListDTO): Promise<BackEndReturn> => {
try{
  const res =  ((await axios.get(`${baseUrl}/findUsersHabits/${habitListDTO.userId}`, {
    timeout: TIMEOUT_NUMBER,
    headers:{
      'Authorization': `${habitListDTO.token}`
    }
  })).data)
 
  if (res.returnCode === SUCCESS_NUMBER) {
    return res;
  } else {
    //若非200，則自定義失敗請求
    throw new Error(`123Request failed with status code ${res.data}`);
  }
}catch (error) {
  showErrorToHome(error.response.data.data);

  return Promise.reject(error);
}}


export const deleteUserHabitAPI = async (habit: DeleteHabitDTO): Promise<BackEndReturn> => {
  try{
    showloading();
    const res =  ((await axios.delete(`${baseUrl}/${habit.habitId}`, {
      timeout: TIMEOUT_NUMBER,
      headers:{
        'Authorization': `${habit.token}`,
        'Access-Control-Allow-Origin': '*'
      }
    } )).data)
    if (res.returnCode === SUCCESS_NUMBER) {
      return res;
    } else {
      //若非200，則自定義失敗請求
      throw new Error(`Request failed with status code ${res.returnCode}`);
    }
  }catch (error) {
    showErrorToHome(error.response.data.data);
    return Promise.reject(error);
  }
}


export const getTagsAPI = async (token:string): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/getTags`, {
      timeout: TIMEOUT_NUMBER,
      headers:{
        'Authorization': `${token}`,
        'Access-Control-Allow-Origin': '*'
      }
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


export const getOneHabitAPI = async (habit:GetOneHabitDTO): Promise<BackEndReturn> => {
  try{
    const res =  ((await axios.get(`${baseUrl}/findOneHabit/${habit.habitId}`, {
      timeout: TIMEOUT_NUMBER,
      headers:{
        'Authorization': `${habit.token}`,
        'Access-Control-Allow-Origin': '*'
      }
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

