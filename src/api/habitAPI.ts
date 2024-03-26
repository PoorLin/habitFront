import axios from "axios";
import { CreateHabitProp, EditHabit, EditHabitStatus, Habit, HabitStatus, MakeChartProp } from "../model/habit";
import { BackEndReturn } from "../model/BackEndReturn";
import { BASE_URL, HABIT_ALREADY_EXIST, HABIT_ALREADY_EXIST_NUMBER, SERVERERROR, SUCCESS_NUMBER, TIMEOUT_NUMBER, handleError, showError, showErrorNoText, showloading, showloadingForFetch } from "../utils/apiUtil";

const baseUrl = `${BASE_URL}/atomicHabits/habit`










export const createHabitAPI = async (habit: CreateHabitProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addHabit`, habit,{
    timeout: TIMEOUT_NUMBER,
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
  handleError(error,SERVERERROR);
  return Promise.reject(error);
}
}


export const updateHabitAPI = async (habit: EditHabit): Promise<BackEndReturn> => {
  try {
    showloading();
    const res =((await axios.put(`${baseUrl}/${habit.habitId}`, habit,{
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
export const updateHabitStatusAPI = async (habit: EditHabitStatus): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.put(`${baseUrl}/updateHabitStatus`, habit,{
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

export const makeChartAPI = async (prop: MakeChartProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/makeChart`, prop,{
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












export const getUserHabit = async (userId: number): Promise<BackEndReturn> => {
try{

  const res =  ((await axios.get(`${baseUrl}/${userId}`, {
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

export const deleteUserHabit = async (habitId: number): Promise<BackEndReturn> => {
  try{
    showloading();
    const res =  ((await axios.delete(`${baseUrl}/${habitId}`, {
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