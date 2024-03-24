import axios from "axios";
import { EditHabit, EditHabitStatus, Habit, HabitStatus, MakeChartProp } from "../model/habit";
import { BackEndReturn } from "../model/BackEndReturn";
import { handleError, showloading } from "../utils/apiUtil";

const baseUrl = 'http://192.168.56.1:8081/atomicHabits/habit'


export const createHabitAPI = async (habit: Habit): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/addHabit`, habit,{
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


export const updateHabitAPI = async (habit: EditHabit): Promise<BackEndReturn> => {
  try {
    showloading();
    const res =((await axios.put(`${baseUrl}/${habit.habitId}`, habit,{
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
export const updateHabitStatusAPI = async (habit: EditHabitStatus): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.put(`${baseUrl}/updateHabitStatus`, habit,{
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

export const makeChartAPI = async (prop: MakeChartProp): Promise<BackEndReturn> => {
  try {
    showloading();
    const res = ((await axios.post(`${baseUrl}/makeChart`, prop,{
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












export const getUserHabit = async (userId: number): Promise<BackEndReturn> => {
  return ((await axios.get(`${baseUrl}/${userId}`, )).data)
}

export const deleteUserHabit = async (habitId: number): Promise<BackEndReturn> => {
  return ((await axios.delete(`${baseUrl}/${habitId}`, )).data)
}