import axios from "axios";
import { Habit} from "../model/habit";

const baseUrl = 'http://172.20.10.3:8081/atomicHabits/habit'

export const getHabit = async () =>{
    return axios.get(
     `${baseUrl}/1`,
{
    timeout: 5000,
    validateStatus:(status)=> status !==401&& status !==403
    
}
  );
}


export const createHabitAPI = async (habit:Habit):Promise<Habit> =>{
  const habitId = (await axios.post<{id:number}>( `${baseUrl}/addHabit`,habit)).data.id

  return {...habit,habitId};
}