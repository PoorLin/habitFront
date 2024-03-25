import axios from "axios";
import { EditHabit, EditHabitStatus, Habit, HabitStatus, MakeChartProp } from "../model/habit";
import { BackEndReturn } from "../model/BackEndReturn";
import { BASE_URL, SUCCESS_NUMBER, handleError, showloading } from "../utils/apiUtil";

const baseUrl = `${BASE_URL}/atomicHabits/habit`


export const createHabitAPI = async (habit: Habit): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addHabit`, habit,{
    timeout: TIMEOUT_NUMBER,
  })).data)
  if (res.returnCode === SUCCESS_NUMBER) {
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
  handleError(error);
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
  handleError(error);
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
  handleError(error);
  return Promise.reject(error);
}
}












export const getUserHabit = async (userId: number): Promise<BackEndReturn> => {
  return ((await axios.get(`${baseUrl}/${userId}`, )).data)
}

export const deleteUserHabit = async (habitId: number): Promise<BackEndReturn> => {
  return ((await axios.delete(`${baseUrl}/${habitId}`, )).data)
}