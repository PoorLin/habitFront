import axios from "axios";
import { EditHabit, EditHabitStatus, Habit, HabitStatus } from "../model/habit";
import { BackEndReturn } from "../model/BackEndReturn";

const baseUrl = 'http://192.168.56.1:8081/atomicHabits/habit'

export const getHabit = async () => {
  return axios.get(
    `${baseUrl}/1`,
    {
      timeout: 5000,
      validateStatus: (status) => status !== 401 && status !== 403
    }
  );
}


export const createHabitAPI = async (habit: Habit): Promise<BackEndReturn> => {
  return ((await axios.post(`${baseUrl}/addHabit`, habit)).data)
}


export const updateHabitAPI = async (habit: EditHabit): Promise<BackEndReturn> => {
  return ((await axios.put(`${baseUrl}/${habit.habitId}`, habit)).data)
}
export const updateHabitStatusAPI = async (habit: EditHabitStatus): Promise<BackEndReturn> => {
  console.log(habit)
  return ((await axios.put(`${baseUrl}/updateHabitStatus`, habit)).data)
}





export const getUserHabit = async (userId: number): Promise<BackEndReturn> => {
  return ((await axios.get(`${baseUrl}/${userId}`, )).data)
}

export const deleteUserHabit = async (habitId: number): Promise<BackEndReturn> => {
  return ((await axios.delete(`${baseUrl}/${habitId}`, )).data)
}