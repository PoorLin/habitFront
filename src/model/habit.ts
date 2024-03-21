export interface Habit{
habitId?:number,
userId:number,
habitName:string,
startDate?:Date
}

export interface EditHabit{
    habitId:number,
    habitName:string,
    }
    
export interface EditHabitStatus{
    habitId:number,
    status:number,
    }
    
export enum HabitStatus{
    UNDO,
    DONE,
    FAILED 

    }

