import { Habit } from "./habit";

export interface EditProp{
  onSave : (habit:string)=> void
  onCancel : ()=> void
}
export interface HabitProp{
  habitId:number,
  habitName:string,
  startDate:Date,
  userId:number,
  status:number
}