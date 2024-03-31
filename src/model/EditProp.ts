import { NewHabit } from "./habit";

export interface EditProp{
  onSave : (newhabit:NewHabit)=> void
  onCancel : ()=> void
}
export interface HabitProp{
  habitId:number,
  habitName:string,
  startDate:Date,
  userId:number,
  status:number,
  type:number
}
export interface HabitRecordList{
  isSuccess:number,
  habitRecordId:number,
  habitId:number,
  recordDate:string,
  status:number
}