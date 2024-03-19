import axios from "axios";

const baseUrl = 'http://172.20.10.3:8081/atomicHabits/habit'

const getHabit = async () =>{
    return axios.get(
     `${baseUrl}/1`,
{
    timeout: 5000,
    validateStatus:(status)=> status !==401&& status !==403
    
}
  );
}